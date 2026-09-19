export declare class CustomCacheService {
    private readonly logger;
    private store;
    private hits;
    private misses;
    private lastFlushedAt;
    get<T = any>(key: string): Promise<T | null>;
    set<T = any>(key: string, value: T, ttlSeconds?: number): Promise<void>;
    delete(key: string): Promise<boolean>;
    invalidatePrefix(prefix: string): Promise<number>;
    flushAll(): Promise<void>;
    getMetrics(): {
        hits: number;
        misses: number;
        hitRate: string;
        totalKeys: number;
        estimatedMemoryKb: string;
        lastFlushedAt: Date;
        uptimeSeconds: number;
    };
    getKeys(): Array<{
        key: string;
        ttlRemaining: number;
        sizeBytes: number;
        createdAt: Date;
    }>;
}
