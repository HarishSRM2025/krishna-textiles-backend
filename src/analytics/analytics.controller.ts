import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';

@ApiTags('Analytics & Business Intelligence')
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('overview')
  @ApiOperation({ summary: 'Get enterprise overview with KPIs, sales trends, category splits, and recent feed' })
  async getOverview() {
    const data = await this.analyticsService.getExecutiveOverview();
    return { success: true, data };
  }

  @Get('top-products')
  @ApiOperation({ summary: 'Get highest revenue-generating products' })
  async getTopProducts(@Query('limit') limit?: number) {
    const data = await this.analyticsService.getTopProducts(limit ? Number(limit) : 5);
    return { success: true, data };
  }
}
