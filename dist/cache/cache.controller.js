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
exports.CacheController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const custom_cache_service_1 = require("./custom-cache.service");
let CacheController = class CacheController {
    constructor(cacheService) {
        this.cacheService = cacheService;
    }
    getMetrics() {
        return {
            success: true,
            data: this.cacheService.getMetrics(),
        };
    }
    getKeys() {
        return {
            success: true,
            data: this.cacheService.getKeys(),
        };
    }
    async flush(body) {
        if (body?.prefix) {
            const cleared = await this.cacheService.invalidatePrefix(body.prefix);
            return {
                success: true,
                message: `Invalidated ${cleared} keys starting with '${body.prefix}'`,
                clearedCount: cleared,
            };
        }
        await this.cacheService.flushAll();
        return {
            success: true,
            message: 'Entire application cache flushed successfully.',
        };
    }
    async deleteKey(key) {
        const deleted = await this.cacheService.delete(key);
        return {
            success: true,
            deleted,
            message: deleted ? `Key '${key}' deleted.` : `Key '${key}' not found.`,
        };
    }
};
exports.CacheController = CacheController;
__decorate([
    (0, common_1.Get)('metrics'),
    (0, swagger_1.ApiOperation)({ summary: 'Get live cache performance metrics and memory usage' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CacheController.prototype, "getMetrics", null);
__decorate([
    (0, common_1.Get)('keys'),
    (0, swagger_1.ApiOperation)({ summary: 'List all cached keys with remaining TTL and size' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CacheController.prototype, "getKeys", null);
__decorate([
    (0, common_1.Post)('flush'),
    (0, swagger_1.ApiOperation)({ summary: 'Flush all cached entries or invalidate by prefix (e.g. products, analytics)' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CacheController.prototype, "flush", null);
__decorate([
    (0, common_1.Delete)('key'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a specific key from cache' }),
    __param(0, (0, common_1.Query)('key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CacheController.prototype, "deleteKey", null);
exports.CacheController = CacheController = __decorate([
    (0, swagger_1.ApiTags)('Cache Management'),
    (0, common_1.Controller)('cache'),
    __metadata("design:paramtypes", [custom_cache_service_1.CustomCacheService])
], CacheController);
//# sourceMappingURL=cache.controller.js.map