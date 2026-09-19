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
exports.InventoryController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const inventory_service_1 = require("./inventory.service");
const session_auth_guard_1 = require("../auth/guards/session-auth.guard");
let InventoryController = class InventoryController {
    constructor(inventoryService) {
        this.inventoryService = inventoryService;
    }
    async getSummary() {
        const summary = await this.inventoryService.getInventorySummary();
        return { success: true, data: summary };
    }
    async getLowStock() {
        const items = await this.inventoryService.getLowStockAlerts();
        return {
            success: true,
            count: items.length,
            data: items,
        };
    }
    async getAudits(productId, limit) {
        const audits = await this.inventoryService.getAuditLogs(productId, limit ? Number(limit) : 50);
        return {
            success: true,
            count: audits.length,
            data: audits,
        };
    }
    async adjust(body, req) {
        const createdBy = req.user?.name || 'Admin';
        const result = await this.inventoryService.adjustStock({
            productId: body.productId,
            delta: Number(body.delta),
            reason: body.reason,
            note: body.note,
            createdBy,
        });
        return {
            success: true,
            message: 'Stock updated and audit record logged',
            data: result,
        };
    }
    async bulkAdjust(body, req) {
        const createdBy = req.user?.name || 'Admin';
        const itemsWithUser = (body.items || []).map((it) => ({ ...it, createdBy }));
        const results = await this.inventoryService.bulkAdjust(itemsWithUser);
        return {
            success: true,
            count: results.length,
            data: results,
        };
    }
};
exports.InventoryController = InventoryController;
__decorate([
    (0, common_1.Get)('summary'),
    (0, swagger_1.ApiOperation)({ summary: 'Get stock summary (total units, inventory valuation, low stock count)' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "getSummary", null);
__decorate([
    (0, common_1.Get)('low-stock'),
    (0, swagger_1.ApiOperation)({ summary: 'Get list of items that have breached low stock threshold' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "getLowStock", null);
__decorate([
    (0, common_1.Get)('audits'),
    (0, swagger_1.ApiOperation)({ summary: 'Get historical inventory adjustment audit logs' }),
    __param(0, (0, common_1.Query)('productId')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "getAudits", null);
__decorate([
    (0, common_1.Post)('adjust'),
    (0, common_1.UseGuards)(session_auth_guard_1.SessionAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Execute single stock adjustment (+/-) with reason and audit log' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "adjust", null);
__decorate([
    (0, common_1.Post)('bulk-adjust'),
    (0, common_1.UseGuards)(session_auth_guard_1.SessionAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Batch inward/outward adjustment for multiple products' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "bulkAdjust", null);
exports.InventoryController = InventoryController = __decorate([
    (0, swagger_1.ApiTags)('Inventory Management'),
    (0, common_1.Controller)('inventory'),
    __metadata("design:paramtypes", [inventory_service_1.InventoryService])
], InventoryController);
//# sourceMappingURL=inventory.controller.js.map