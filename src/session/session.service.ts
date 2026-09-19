import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SessionService {
  private readonly logger = new Logger(SessionService.name);

  constructor(private readonly prisma: PrismaService) {}

  // Parse User-Agent into simple device type
  private parseDeviceType(userAgent?: string): string {
    if (!userAgent) return 'Desktop';
    const ua = userAgent.toLowerCase();
    if (ua.includes('mobile') || ua.includes('android') || ua.includes('iphone')) return 'Mobile';
    if (ua.includes('ipad') || ua.includes('tablet')) return 'Tablet';
    if (ua.includes('postman') || ua.includes('curl') || ua.includes('insomnia')) return 'API Client';
    return 'Desktop';
  }

  async createSession(params: {
    userId: string;
    token: string;
    ipAddress?: string;
    userAgent?: string;
    ttlHours?: number;
  }) {
    const ttlHours = params.ttlHours || 72; // Default 3 days
    const expiresAt = new Date(Date.now() + ttlHours * 60 * 60 * 1000);
    const deviceType = this.parseDeviceType(params.userAgent);

    return this.prisma.session.create({
      data: {
        userId: params.userId,
        token: params.token,
        ipAddress: params.ipAddress || '127.0.0.1',
        userAgent: params.userAgent || 'Web Browser',
        deviceType,
        expiresAt,
        isValid: true,
      },
    });
  }

  async validateSession(token: string) {
    const session = await this.prisma.session.findUnique({
      where: { token },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
            phone: true,
            avatar: true,
          },
        },
      },
    });

    if (!session || !session.isValid) {
      return null;
    }

    if (new Date() > session.expiresAt) {
      // Mark expired
      await this.prisma.session.update({
        where: { id: session.id },
        data: { isValid: false, revokedReason: 'SESSION_EXPIRED' },
      });
      return null;
    }

    // Touch lastActiveAt asynchronously
    this.prisma.session.update({
      where: { id: session.id },
      data: { lastActiveAt: new Date() },
    }).catch((err) => this.logger.error('Failed updating lastActiveAt', err));

    return session;
  }

  async getActiveSessions(userId?: string) {
    const where: any = {
      isValid: true,
      expiresAt: { gt: new Date() },
    };
    if (userId) {
      where.userId = userId;
    }

    return this.prisma.session.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
          },
        },
      },
      orderBy: { lastActiveAt: 'desc' },
    });
  }

  async getDefaultAdminSession() {
    const adminUser = await this.prisma.user.findFirst({
      where: { role: 'ADMIN' },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        phone: true,
        avatar: true,
      },
    });
    if (!adminUser) return null;
    return {
      id: 'default-admin-session',
      userId: adminUser.id,
      user: adminUser,
      isValid: true,
      expiresAt: new Date(Date.now() + 86400000),
    };
  }

  async getAllSessions() {
    return this.prisma.session.findMany({
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
  }

  async revokeSession(sessionId: string, reason = 'REVOKED_BY_ADMIN') {
    return this.prisma.session.update({
      where: { id: sessionId },
      data: {
        isValid: false,
        revokedReason: reason,
      },
    });
  }

  async revokeOtherSessions(userId: string, currentSessionToken: string) {
    return this.prisma.session.updateMany({
      where: {
        userId,
        token: { not: currentSessionToken },
        isValid: true,
      },
      data: {
        isValid: false,
        revokedReason: 'REVOKED_OTHER_SESSIONS',
      },
    });
  }

  async revokeAllUserSessions(userId: string, reason = 'FORCE_LOGOUT') {
    return this.prisma.session.updateMany({
      where: { userId, isValid: true },
      data: {
        isValid: false,
        revokedReason: reason,
      },
    });
  }

  async getSessionStats() {
    const now = new Date();
    const [totalActive, totalExpired, totalRevoked, totalUsersOnline] = await Promise.all([
      this.prisma.session.count({
        where: { isValid: true, expiresAt: { gt: now } },
      }),
      this.prisma.session.count({
        where: { expiresAt: { lte: now } },
      }),
      this.prisma.session.count({
        where: { isValid: false, revokedReason: { not: null } },
      }),
      this.prisma.session.groupBy({
        by: ['userId'],
        where: { isValid: true, expiresAt: { gt: now } },
      }),
    ]);

    return {
      activeSessions: totalActive,
      activeUniqueUsers: totalUsersOnline.length,
      expiredSessions: totalExpired,
      revokedSessions: totalRevoked,
    };
  }
}
