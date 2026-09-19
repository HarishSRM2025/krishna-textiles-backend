import { PrismaService } from '../prisma/prisma.service';
export declare class SessionService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    private parseDeviceType;
    createSession(params: {
        userId: string;
        token: string;
        ipAddress?: string;
        userAgent?: string;
        ttlHours?: number;
    }): Promise<{
        id: string;
        token: string;
        ipAddress: string | null;
        userAgent: string | null;
        deviceType: string | null;
        isValid: boolean;
        expiresAt: Date;
        revokedReason: string | null;
        lastActiveAt: Date;
        createdAt: Date;
        userId: string;
    }>;
    validateSession(token: string): Promise<{
        user: {
            id: string;
            name: string;
            email: string;
            role: import(".prisma/client").$Enums.Role;
            phone: string;
            avatar: string;
        };
    } & {
        id: string;
        token: string;
        ipAddress: string | null;
        userAgent: string | null;
        deviceType: string | null;
        isValid: boolean;
        expiresAt: Date;
        revokedReason: string | null;
        lastActiveAt: Date;
        createdAt: Date;
        userId: string;
    }>;
    getActiveSessions(userId?: string): Promise<({
        user: {
            id: string;
            name: string;
            email: string;
            role: import(".prisma/client").$Enums.Role;
        };
    } & {
        id: string;
        token: string;
        ipAddress: string | null;
        userAgent: string | null;
        deviceType: string | null;
        isValid: boolean;
        expiresAt: Date;
        revokedReason: string | null;
        lastActiveAt: Date;
        createdAt: Date;
        userId: string;
    })[]>;
    getDefaultAdminSession(): Promise<{
        id: string;
        userId: string;
        user: {
            id: string;
            name: string;
            email: string;
            role: import(".prisma/client").$Enums.Role;
            phone: string;
            avatar: string;
        };
        isValid: boolean;
        expiresAt: Date;
    }>;
    getAllSessions(): Promise<({
        user: {
            id: string;
            name: string;
            email: string;
            role: import(".prisma/client").$Enums.Role;
        };
    } & {
        id: string;
        token: string;
        ipAddress: string | null;
        userAgent: string | null;
        deviceType: string | null;
        isValid: boolean;
        expiresAt: Date;
        revokedReason: string | null;
        lastActiveAt: Date;
        createdAt: Date;
        userId: string;
    })[]>;
    revokeSession(sessionId: string, reason?: string): Promise<{
        id: string;
        token: string;
        ipAddress: string | null;
        userAgent: string | null;
        deviceType: string | null;
        isValid: boolean;
        expiresAt: Date;
        revokedReason: string | null;
        lastActiveAt: Date;
        createdAt: Date;
        userId: string;
    }>;
    revokeOtherSessions(userId: string, currentSessionToken: string): Promise<import(".prisma/client").Prisma.BatchPayload>;
    revokeAllUserSessions(userId: string, reason?: string): Promise<import(".prisma/client").Prisma.BatchPayload>;
    getSessionStats(): Promise<{
        activeSessions: number;
        activeUniqueUsers: number;
        expiredSessions: number;
        revokedSessions: number;
    }>;
}
