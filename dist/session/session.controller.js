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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const session_service_1 = require("./session.service");
let SessionController = class SessionController {
    constructor(sessionService) {
        this.sessionService = sessionService;
    }
    async getActiveSessions(userId) {
        const sessions = await this.sessionService.getActiveSessions(userId);
        return {
            success: true,
            count: sessions.length,
            data: sessions,
        };
    }
    async getAllSessions() {
        const sessions = await this.sessionService.getAllSessions();
        return {
            success: true,
            count: sessions.length,
            data: sessions,
        };
    }
    async getSessionStats() {
        const stats = await this.sessionService.getSessionStats();
        return {
            success: true,
            data: stats,
        };
    }
    async revokeSession(id, body) {
        const revoked = await this.sessionService.revokeSession(id, body?.reason || 'ADMIN_MANUAL_REVOCATION');
        return {
            success: true,
            message: 'Session successfully revoked.',
            data: revoked,
        };
    }
    async revokeOthers(body) {
        const result = await this.sessionService.revokeOtherSessions(body.userId, body.currentToken);
        return {
            success: true,
            message: `Revoked ${result.count} other active sessions.`,
            count: result.count,
        };
    }
    async revokeAll(body) {
        const result = await this.sessionService.revokeAllUserSessions(body.userId, body.reason);
        return {
            success: true,
            message: `Revoked ${result.count} sessions for user.`,
            count: result.count,
        };
    }
};
exports.SessionController = SessionController;
__decorate([
    (0, common_1.Get)('active'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all currently active user sessions' }),
    __param(0, (0, common_1.Query)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SessionController.prototype, "getActiveSessions", null);
__decorate([
    (0, common_1.Get)('all'),
    (0, swagger_1.ApiOperation)({ summary: 'Get session audit history' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SessionController.prototype, "getAllSessions", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, swagger_1.ApiOperation)({ summary: 'Get session analytics (active, expired, revoked count)' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SessionController.prototype, "getSessionStats", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Force revoke a specific user session' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SessionController.prototype, "revokeSession", null);
__decorate([
    (0, common_1.Post)('revoke-others'),
    (0, swagger_1.ApiOperation)({ summary: 'Revoke all other sessions for a user' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SessionController.prototype, "revokeOthers", null);
__decorate([
    (0, common_1.Post)('revoke-all'),
    (0, swagger_1.ApiOperation)({ summary: 'Revoke all sessions for a user (force logout)' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SessionController.prototype, "revokeAll", null);
exports.SessionController = SessionController = __decorate([
    (0, swagger_1.ApiTags)('User Session Management'),
    (0, common_1.Controller)('session'),
    __metadata("design:paramtypes", [session_service_1.SessionService])
], SessionController);
//# sourceMappingURL=session.controller.js.map