import { AuthService } from './auth.service';
export declare class LoginDto {
    email: string;
    password: string;
}
export declare class RegisterDto {
    email: string;
    password: string;
    name: string;
    phone?: string;
    role?: any;
}
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(body: LoginDto, req: any): Promise<{
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
    register(body: RegisterDto): Promise<{
        id: string;
        email: string;
        name: string;
        role: import(".prisma/client").$Enums.Role;
    }>;
    logout(authHeader: string): Promise<{
        success: boolean;
        message?: undefined;
    } | {
        success: boolean;
        message: string;
    }>;
    getProfile(req: any): Promise<{
        success: boolean;
        user: any;
        session: {
            id: any;
            deviceType: any;
            ipAddress: any;
            lastActiveAt: any;
            expiresAt: any;
        };
    }>;
}
