import { Controller, Get, Post, Body, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CustomCacheService } from './custom-cache.service';

@ApiTags('Cache Management')
@Controller('cache')
export class CacheController {
  constructor(private readonly cacheService: CustomCacheService) {}

  @Get('metrics')
  @ApiOperation({ summary: 'Get live cache performance metrics and memory usage' })
  getMetrics() {
    return {
      success: true,
      data: this.cacheService.getMetrics(),
    };
  }

  @Get('keys')
  @ApiOperation({ summary: 'List all cached keys with remaining TTL and size' })
  getKeys() {
    return {
      success: true,
      data: this.cacheService.getKeys(),
    };
  }

  @Post('flush')
  @ApiOperation({ summary: 'Flush all cached entries or invalidate by prefix (e.g. products, analytics)' })
  async flush(@Body() body: { prefix?: string }) {
    if (body?.prefix) {
      const cleared = await this.cacheService.invalidatePrefix(body.prefix);
      return {
        success: true,
        message: `Invalidated ${cleared} keys starting with '${body.prefix}'`,
        clearedCount: cleared,
      };
    }

    await this.cacheService.flushAll();
    return {
      success: true,
      message: 'Entire application cache flushed successfully.',
    };
  }

  @Delete('key')
  @ApiOperation({ summary: 'Delete a specific key from cache' })
  async deleteKey(@Query('key') key: string) {
    const deleted = await this.cacheService.delete(key);
    return {
      success: true,
      deleted,
      message: deleted ? `Key '${key}' deleted.` : `Key '${key}' not found.`,
    };
  }
}
