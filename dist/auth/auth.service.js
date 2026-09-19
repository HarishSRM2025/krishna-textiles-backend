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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../prisma/prisma.service");
const session_service_1 = require("../session/session.service");
const bcrypt = require("bcryptjs");
let AuthService = class AuthService {
    constructor(prisma, jwtService, sessionService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.sessionService = sessionService;
    }
    async login(email, pass, meta) {
        if (!email || typeof email !== 'string' || !pass || typeof pass !== 'string') {
            throw new common_1.BadRequestException('Email and password are required.');
        }
        const user = await this.prisma.user.findUnique({
            where: { email: email.toLowerCase().trim() },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid email or password.');
        }
        const isMatch = await bcrypt.compare(pass, user.passwordHash);
        if (!isMatch) {
            throw new common_1.UnauthorizedException('Invalid email or password.');
        }
        const payload = { sub: user.id, email: user.email, role: user.role };
        const accessToken = this.jwtService.sign(payload);
        const session = await this.sessionService.createSession({
            userId: user.id,
            token: accessToken,
            ipAddress: meta.ipAddress,
            userAgent: meta.userAgent,
        });
        return {
            accessToken,
            session: {
                id: session.id,
                deviceType: session.deviceType,
                expiresAt: session.expiresAt,
            },
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                phone: user.phone,
                avatar: user.avatar,
            },
        };
    }
    async logout(token) {
        if (!token)
            return { success: true };
        const session = await this.prisma.session.findUnique({ where: { token } });
        if (session) {
            await this.sessionService.revokeSession(session.id, 'USER_LOGOUT');
        }
        return { success: true, message: 'Logged out successfully.' };
    }
    async register(data) {
        if (!data?.email || typeof data.email !== 'string' || !data?.password || typeof data.password !== 'string') {
            throw new common_1.BadRequestException('Valid email and password are required.');
        }
        const existing = await this.prisma.user.findUnique({
            where: { email: data.email.toLowerCase().trim() },
        });
        if (existing) {
            throw new common_1.BadRequestException('User with this email already exists.');
        }
        const passwordHash = await bcrypt.hash(data.password, 10);
        const user = await this.prisma.user.create({
            data: {
                email: data.email.toLowerCase().trim(),
                passwordHash,
                name: data.name,
                phone: data.phone,
                role: data.role || 'ADMIN',
            },
        });
        return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
        };
    }
    async getProfile(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                phone: true,
                avatar: true,
                createdAt: true,
            },
        });
        if (!user)
            throw new common_1.UnauthorizedException('User not found.');
        return user;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        session_service_1.SessionService])
], AuthService);
//# sourceMappingURL=auth.service.js.map