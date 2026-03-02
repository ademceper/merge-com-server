import { Module } from '@nestjs/common';
import { ChangeModule } from '../change/change.module';
import { SharedModule } from '../shared/shared.module';
import { NotificationGroupsController } from './notification-groups.controller';
import { USE_CASES } from './usecases';

@Module({
  imports: [SharedModule, ChangeModule],
  providers: [...USE_CASES],
  controllers: [NotificationGroupsController],
  exports: [...USE_CASES],
})
export class NotificationGroupsModule {}
