import { CmsService } from './cms.service';
export declare class CmsController {
    private readonly cmsService;
    constructor(cmsService: CmsService);
    getBanners(): Promise<{
        success: boolean;
        data: import("./cms.service").CmsBanner[];
    }>;
    getBanner(id: string): Promise<{
        success: boolean;
        data: import("./cms.service").CmsBanner;
    }>;
    createBanner(body: any): Promise<{
        success: boolean;
        message: string;
        data: import("./cms.service").CmsBanner;
    }>;
    updateBanner(id: string, body: any): Promise<{
        success: boolean;
        message: string;
        data: import("./cms.service").CmsBanner;
    }>;
    deleteBanner(id: string): Promise<{
        success: boolean;
        message: string;
        data: import("./cms.service").CmsBanner;
    }>;
    getPages(): Promise<{
        success: boolean;
        data: import("./cms.service").CmsPage[];
    }>;
    getPage(slug: string): Promise<{
        success: boolean;
        data: import("./cms.service").CmsPage;
    }>;
    createPage(body: any): Promise<{
        success: boolean;
        message: string;
        data: import("./cms.service").CmsPage;
    }>;
    updatePage(id: string, body: any): Promise<{
        success: boolean;
        message: string;
        data: import("./cms.service").CmsPage;
    }>;
    deletePage(id: string): Promise<{
        success: boolean;
        message: string;
        data: import("./cms.service").CmsPage;
    }>;
    getAnnouncement(): Promise<{
        success: boolean;
        data: import("./cms.service").CmsAnnouncement;
    }>;
    updateAnnouncement(body: any): Promise<{
        success: boolean;
        message: string;
        data: import("./cms.service").CmsAnnouncement;
    }>;
}
