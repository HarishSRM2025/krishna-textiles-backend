import { CustomCacheService } from './custom-cache.service';
export declare class CacheController {
    private readonly cacheService;
    constructor(cacheService: CustomCacheService);
    getMetrics(): {
        success: boolean;
        data: {
            hits: number;
            misses: number;
            hitRate: string;
            totalKeys: number;
            estimatedMemoryKb: string;
            lastFlushedAt: Date;
            uptimeSeconds: number;
        };
    };
    getKeys(): {
        success: boolean;
        data: {
            key: string;
            ttlRemaining: number;
            sizeBytes: number;
            createdAt: Date;
        }[];
    };
    flush(body: {
        prefix?: string;
    }): Promise<{
        success: boolean;
        message: string;
        clearedCount: number;
    } | {
        success: boolean;
        message: string;
        clearedCount?: undefined;
    }>;
    deleteKey(key: string): Promise<{
        success: boolean;
        deleted: boolean;
        message: string;
    }>;
}
