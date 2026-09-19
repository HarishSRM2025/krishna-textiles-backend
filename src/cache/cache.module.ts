import { Global, Module } from '@nestjs/common';
import { CustomCacheService } from './custom-cache.service';
import { CacheController } from './cache.controller';

@Global()
@Module({
  controllers: [CacheController],
  providers: [CustomCacheService],
  exports: [CustomCacheService],
})
export class CustomCacheModule {}
