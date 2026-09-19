import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { SessionService } from '../session/session.service';
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    private readonly sessionService;
    constructor(prisma: PrismaService, jwtService: JwtService, sessionService: SessionService);
    login(email: string, pass: string, meta: {
        ipAddress?: string;
        userAgent?: string;
    }): Promise<{
        accessToken: string;
        session: {
            id: string;
            deviceType: string;
            expiresAt: Date;
        };
        user: {
            id: string;
            email: string;
            name: string;
            role: import(".prisma/client").$Enums.Role;
            phone: string;
            avatar: string;
        };
    }>;
    logout(token: string): Promise<{
        success: boolean;
        message?: undefined;
    } | {
        success: boolean;
        message: string;
    }>;
    register(data: {
        email: string;
        password: string;
        name: string;
        phone?: string;
        role?: any;
    }): Promise<{
        id: string;
        email: string;
        name: string;
        role: import(".prisma/client").$Enums.Role;
    }>;
    getProfile(userId: string): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        email: string;
        role: import(".prisma/client").$Enums.Role;
        phone: string;
        avatar: string;
    }>;
}
