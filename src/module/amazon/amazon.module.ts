import { Module } from '@nestjs/common';
import { AmazonController } from './amazon.controller';
import { AmazonService } from './amazon.service';
import { CacheConfigModule } from 'src/common/cache/cache.module';

@Module({
  imports: [CacheConfigModule],
  controllers: [AmazonController],
  providers: [AmazonService],
})
export class AmazonModule {}