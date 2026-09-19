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
exports.CrmController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const crm_service_1 = require("./crm.service");
const client_1 = require("@prisma/client");
const session_auth_guard_1 = require("../auth/guards/session-auth.guard");
let CrmController = class CrmController {
    constructor(crmService) {
        this.crmService = crmService;
    }
    async findAll(type, search) {
        const data = await this.crmService.findAll({ type, search });
        return {
            success: true,
            count: data.length,
            data,
        };
    }
    async getStats() {
        const stats = await this.crmService.getCrmStats();
        return { success: true, data: stats };
    }
    async findOne(id) {
        const data = await this.crmService.findOne(id);
        return { success: true, data };
    }
    async create(body) {
        const data = await this.crmService.create(body);
        return {
            success: true,
            message: 'Customer registered successfully',
            data,
        };
    }
    async update(id, body) {
        const data = await this.crmService.update(id, body);
        return {
            success: true,
            message: 'Customer updated successfully',
            data,
        };
    }
    async addNote(id, body, req) {
        const author = req.user?.name || 'Admin';
        const note = await this.crmService.addNote(id, body.note, author);
        return {
            success: true,
            message: 'Interaction note logged',
            data: note,
        };
    }
};
exports.CrmController = CrmController;
__decorate([
    (0, common_1.Get)('customers'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all customers with metrics (LTV, total orders, last order date)' }),
    __param(0, (0, common_1.Query)('type')),
    __param(1, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CrmController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, swagger_1.ApiOperation)({ summary: 'Get CRM client segmentation statistics' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CrmController.prototype, "getStats", null);
__decorate([
    (0, common_1.Get)('customers/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get complete customer profile, notes timeline, and order history' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CrmController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)('customers'),
    (0, common_1.UseGuards)(session_auth_guard_1.SessionAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create new customer / wholesale client' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CrmController.prototype, "create", null);
__decorate([
    (0, common_1.Put)('customers/:id'),
    (0, common_1.UseGuards)(session_auth_guard_1.SessionAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update customer details' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CrmController.prototype, "update", null);
__decorate([
    (0, common_1.Post)('customers/:id/notes'),
    (0, common_1.UseGuards)(session_auth_guard_1.SessionAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Add a new CRM interaction note/log' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], CrmController.prototype, "addNote", null);
exports.CrmController = CrmController = __decorate([
    (0, swagger_1.ApiTags)('CRM & Customer Management'),
    (0, common_1.Controller)('crm'),
    __metadata("design:paramtypes", [crm_service_1.CrmService])
], CrmController);
//# sourceMappingURL=crm.controller.js.map