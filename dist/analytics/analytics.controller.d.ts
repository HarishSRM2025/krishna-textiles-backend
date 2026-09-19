import { AnalyticsService } from './analytics.service';
export declare class AnalyticsController {
    private readonly analyticsService;
    constructor(analyticsService: AnalyticsService);
    getOverview(): Promise<{
        success: boolean;
        data: any;
    }>;
    getTopProducts(limit?: number): Promise<{
        success: boolean;
        data: any;
    }>;
}
