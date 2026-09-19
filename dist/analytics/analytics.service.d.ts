import { PrismaService } from '../prisma/prisma.service';
import { CustomCacheService } from '../cache/custom-cache.service';
export declare class AnalyticsService {
    private readonly prisma;
    private readonly cache;
    constructor(prisma: PrismaService, cache: CustomCacheService);
    getExecutiveOverview(): Promise<any>;
    getTopProducts(limit?: number): Promise<any>;
}
