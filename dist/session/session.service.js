"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var SessionService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let SessionService = SessionService_1 = class SessionService {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(SessionService_1.name);
    }
    parseDeviceType(userAgent) {
        if (!userAgent)
            return 'Desktop';
        const ua = userAgent.toLowerCase();
        if (ua.includes('mobile') || ua.includes('android') || ua.includes('iphone'))
            return 'Mobile';
        if (ua.includes('ipad') || ua.includes('tablet'))
            return 'Tablet';
        if (ua.includes('postman') || ua.includes('curl') || ua.includes('insomnia'))
            return 'API Client';
        return 'Desktop';
    }
    async createSession(params) {
        const ttlHours = params.ttlHours || 72;
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
    async validateSession(token) {
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
            await this.prisma.session.update({
                where: { id: session.id },
                data: { isValid: false, revokedReason: 'SESSION_EXPIRED' },
            });
            return null;
        }
        this.prisma.session.update({
            where: { id: session.id },
            data: { lastActiveAt: new Date() },
        }).catch((err) => this.logger.error('Failed updating lastActiveAt', err));
        return session;
    }
    async getActiveSessions(userId) {
        const where = {
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
        if (!adminUser)
            return null;
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
    async revokeSession(sessionId, reason = 'REVOKED_BY_ADMIN') {
        return this.prisma.session.update({
            where: { id: sessionId },
            data: {
                isValid: false,
                revokedReason: reason,
            },
        });
    }
    async revokeOtherSessions(userId, currentSessionToken) {
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
    async revokeAllUserSessions(userId, reason = 'FORCE_LOGOUT') {
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
};
exports.SessionService = SessionService;
exports.SessionService = SessionService = SessionService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SessionService);
//# sourceMappingURL=session.service.js.map