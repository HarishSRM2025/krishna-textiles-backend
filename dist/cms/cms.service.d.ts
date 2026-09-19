export interface CmsBanner {
    id: string;
    tag?: string;
    title: string;
    subtitle?: string;
    image: string;
    linkUrl: string;
    buttonText: string;
    secondaryLinkUrl?: string;
    secondaryButtonText?: string;
    badgeText?: string;
    accentColor?: string;
    priority: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}
export interface CmsPage {
    id: string;
    title: string;
    slug: string;
    content: string;
    metaDescription?: string;
    isPublished: boolean;
    lastUpdatedBy: string;
    updatedAt: string;
}
export interface CmsAnnouncement {
    id: string;
    text: string;
    linkUrl?: string;
    badgeText?: string;
    bgColor?: string;
    textColor?: string;
    isActive: boolean;
    updatedAt: string;
}
export declare class CmsService {
    private dataFilePath;
    private defaultBanners;
    private defaultPages;
    private defaultAnnouncement;
    private banners;
    private pages;
    private announcement;
    constructor();
    private loadData;
    private saveData;
    getAllBanners(): Promise<CmsBanner[]>;
    getBanner(id: string): Promise<CmsBanner>;
    createBanner(data: Partial<CmsBanner>): Promise<CmsBanner>;
    updateBanner(id: string, data: Partial<CmsBanner>): Promise<CmsBanner>;
    deleteBanner(id: string): Promise<CmsBanner>;
    getAllPages(): Promise<CmsPage[]>;
    getPageBySlug(slug: string): Promise<CmsPage>;
    createPage(data: Partial<CmsPage>): Promise<CmsPage>;
    updatePage(id: string, data: Partial<CmsPage>): Promise<CmsPage>;
    deletePage(id: string): Promise<CmsPage>;
    getAnnouncement(): Promise<CmsAnnouncement>;
    updateAnnouncement(data: Partial<CmsAnnouncement>): Promise<CmsAnnouncement>;
}
