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
exports.CmsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const cms_service_1 = require("./cms.service");
const session_auth_guard_1 = require("../auth/guards/session-auth.guard");
let CmsController = class CmsController {
    constructor(cmsService) {
        this.cmsService = cmsService;
    }
    async getBanners() {
        const banners = await this.cmsService.getAllBanners();
        return { success: true, data: banners };
    }
    async getBanner(id) {
        const banner = await this.cmsService.getBanner(id);
        return { success: true, data: banner };
    }
    async createBanner(body) {
        const banner = await this.cmsService.createBanner(body);
        return { success: true, message: 'Banner created successfully', data: banner };
    }
    async updateBanner(id, body) {
        const banner = await this.cmsService.updateBanner(id, body);
        return { success: true, message: 'Banner updated successfully', data: banner };
    }
    async deleteBanner(id) {
        const banner = await this.cmsService.deleteBanner(id);
        return { success: true, message: 'Banner removed successfully', data: banner };
    }
    async getPages() {
        const pages = await this.cmsService.getAllPages();
        return { success: true, data: pages };
    }
    async getPage(slug) {
        const page = await this.cmsService.getPageBySlug(slug);
        return { success: true, data: page };
    }
    async createPage(body) {
        const page = await this.cmsService.createPage(body);
        return { success: true, message: 'Webstore page created successfully', data: page };
    }
    async updatePage(id, body) {
        const page = await this.cmsService.updatePage(id, body);
        return { success: true, message: 'Webstore page updated successfully', data: page };
    }
    async deletePage(id) {
        const page = await this.cmsService.deletePage(id);
        return { success: true, message: 'Webstore page deleted successfully', data: page };
    }
    async getAnnouncement() {
        const announcement = await this.cmsService.getAnnouncement();
        return { success: true, data: announcement };
    }
    async updateAnnouncement(body) {
        const announcement = await this.cmsService.updateAnnouncement(body);
        return { success: true, message: 'Storefront announcement updated', data: announcement };
    }
};
exports.CmsController = CmsController;
__decorate([
    (0, common_1.Get)('banners'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all storefront hero banners & sliders' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "getBanners", null);
__decorate([
    (0, common_1.Get)('banners/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get single hero banner' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "getBanner", null);
__decorate([
    (0, common_1.Post)('banners'),
    (0, common_1.UseGuards)(session_auth_guard_1.SessionAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create new storefront hero banner' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "createBanner", null);
__decorate([
    (0, common_1.Put)('banners/:id'),
    (0, common_1.UseGuards)(session_auth_guard_1.SessionAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update storefront banner details' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "updateBanner", null);
__decorate([
    (0, common_1.Delete)('banners/:id'),
    (0, common_1.UseGuards)(session_auth_guard_1.SessionAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Delete storefront banner' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "deleteBanner", null);
__decorate([
    (0, common_1.Get)('pages'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all webstore policy and informational pages' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "getPages", null);
__decorate([
    (0, common_1.Get)('pages/:slug'),
    (0, swagger_1.ApiOperation)({ summary: 'Get webstore page by slug' }),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "getPage", null);
__decorate([
    (0, common_1.Post)('pages'),
    (0, common_1.UseGuards)(session_auth_guard_1.SessionAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create new webstore page' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "createPage", null);
__decorate([
    (0, common_1.Put)('pages/:id'),
    (0, common_1.UseGuards)(session_auth_guard_1.SessionAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update webstore page content or publishing status' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "updatePage", null);
__decorate([
    (0, common_1.Delete)('pages/:id'),
    (0, common_1.UseGuards)(session_auth_guard_1.SessionAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Delete webstore page' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "deletePage", null);
__decorate([
    (0, common_1.Get)('announcement'),
    (0, swagger_1.ApiOperation)({ summary: 'Get active storefront announcement bar text & config' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "getAnnouncement", null);
__decorate([
    (0, common_1.Put)('announcement'),
    (0, common_1.UseGuards)(session_auth_guard_1.SessionAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update storefront announcement bar message and styles' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "updateAnnouncement", null);
exports.CmsController = CmsController = __decorate([
    (0, swagger_1.ApiTags)('Storefront CMS'),
    (0, common_1.Controller)('cms'),
    __metadata("design:paramtypes", [cms_service_1.CmsService])
], CmsController);
//# sourceMappingURL=cms.controller.js.map