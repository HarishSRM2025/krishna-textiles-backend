import { SessionService } from './session.service';
export declare class SessionController {
    private readonly sessionService;
    constructor(sessionService: SessionService);
    getActiveSessions(userId?: string): Promise<{
        success: boolean;
        count: number;
        data: ({
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
        })[];
    }>;
    getAllSessions(): Promise<{
        success: boolean;
        count: number;
        data: ({
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
        })[];
    }>;
    getSessionStats(): Promise<{
        success: boolean;
        data: {
            activeSessions: number;
            activeUniqueUsers: number;
            expiredSessions: number;
            revokedSessions: number;
        };
    }>;
    revokeSession(id: string, body: {
        reason?: string;
    }): Promise<{
        success: boolean;
        message: string;
        data: {
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
        };
    }>;
    revokeOthers(body: {
        userId: string;
        currentToken: string;
    }): Promise<{
        success: boolean;
        message: string;
        count: number;
    }>;
    revokeAll(body: {
        userId: string;
        reason?: string;
    }): Promise<{
        success: boolean;
        message: string;
        count: number;
    }>;
}
