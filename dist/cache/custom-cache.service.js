"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var CustomCacheService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomCacheService = void 0;
const common_1 = require("@nestjs/common");
let CustomCacheService = CustomCacheService_1 = class CustomCacheService {
    constructor() {
        this.logger = new common_1.Logger(CustomCacheService_1.name);
        this.store = new Map();
        this.hits = 0;
        this.misses = 0;
        this.lastFlushedAt = null;
    }
    async get(key) {
        const entry = this.store.get(key);
        if (!entry) {
            this.misses++;
            return null;
        }
        if (Date.now() > entry.expiresAt) {
            this.store.delete(key);
            this.misses++;
            return null;
        }
        this.hits++;
        return entry.value;
    }
    async set(key, value, ttlSeconds = 300) {
        const serialized = JSON.stringify(value);
        const sizeBytes = Buffer.byteLength(serialized, 'utf-8');
        this.store.set(key, {
            value,
            expiresAt: Date.now() + ttlSeconds * 1000,
            createdAt: Date.now(),
            sizeBytes,
        });
    }
    async delete(key) {
        return this.store.delete(key);
    }
    async invalidatePrefix(prefix) {
        let count = 0;
        for (const key of this.store.keys()) {
            if (key.startsWith(prefix)) {
                this.store.delete(key);
                count++;
            }
        }
        this.logger.log(`Invalidated ${count} cache entries with prefix: "${prefix}"`);
        return count;
    }
    async flushAll() {
        const total = this.store.size;
        this.store.clear();
        this.lastFlushedAt = new Date();
        this.logger.log(`Flushed entire cache (${total} keys cleared)`);
    }
    getMetrics() {
        const now = Date.now();
        let totalBytes = 0;
        const activeKeys = [];
        for (const [key, entry] of this.store.entries()) {
            if (now <= entry.expiresAt) {
                totalBytes += entry.sizeBytes;
                activeKeys.push(key);
            }
            else {
                this.store.delete(key);
            }
        }
        const totalRequests = this.hits + this.misses;
        const hitRate = totalRequests > 0 ? ((this.hits / totalRequests) * 100).toFixed(1) + '%' : '0%';
        return {
            hits: this.hits,
            misses: this.misses,
            hitRate,
            totalKeys: activeKeys.length,
            estimatedMemoryKb: (totalBytes / 1024).toFixed(2),
            lastFlushedAt: this.lastFlushedAt,
            uptimeSeconds: Math.floor(process.uptime()),
        };
    }
    getKeys() {
        const now = Date.now();
        const result = [];
        for (const [key, entry] of this.store.entries()) {
            if (now <= entry.expiresAt) {
                result.push({
                    key,
                    ttlRemaining: Math.max(0, Math.round((entry.expiresAt - now) / 1000)),
                    sizeBytes: entry.sizeBytes,
                    createdAt: new Date(entry.createdAt),
                });
            }
            else {
                this.store.delete(key);
            }
        }
        return result;
    }
};
exports.CustomCacheService = CustomCacheService;
exports.CustomCacheService = CustomCacheService = CustomCacheService_1 = __decorate([
    (0, common_1.Injectable)()
], CustomCacheService);
//# sourceMappingURL=custom-cache.service.js.map