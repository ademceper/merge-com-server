import { Module } from '@nestjs/common';
import { CommunityOrganizationRepository } from 'libs/dal';
import { SharedModule } from '../shared/shared.module';
import { NotificationsController } from './notification.controller';
import { USE_CASES } from './usecases';

@Module({
  imports: [SharedModule],
  providers: [...USE_CASES, CommunityOrganizationRepository],
  controllers: [NotificationsController],
})
export class NotificationModule {}
