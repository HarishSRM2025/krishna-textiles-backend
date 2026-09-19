import { Module } from '@nestjs/common';
import { CmsController } from './cms.controller';
import { CmsService } from './cms.service';
import { PrismaModule } from '../prisma/prisma.module';
import { CustomCacheModule } from '../cache/cache.module';
import { SessionModule } from '../session/session.module';

@Module({
  imports: [PrismaModule, CustomCacheModule, SessionModule],
  controllers: [CmsController],
  providers: [CmsService],
  exports: [CmsService],
})
export class CmsModule {}
