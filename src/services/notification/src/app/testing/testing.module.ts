import { Module } from '@nestjs/common';
import { RateLimitingModule } from '../rate-limiting/rate-limiting.module';
import { SharedModule } from '../shared/shared.module';
import { TestApiAuthController } from './auth.controller';
import { TestApiRateLimitBulkController, TestApiRateLimitController } from './rate-limiting.controller';
import { TestingController } from './testing.controller';

@Module({
  imports: [SharedModule, RateLimitingModule],
  controllers: [TestingController, TestApiRateLimitController, TestApiRateLimitBulkController, TestApiAuthController],
})
export class TestingModule {}
