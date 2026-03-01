import { Module } from '@nestjs/common';
import type { MiddlewareConsumer, NestModule } from '@nestjs/common';
import { DeletePreferencesUseCase, GetPreferences, UpsertPreferences } from 'libs/application-generic';
import { PreferencesRepository } from 'libs/dal';
import { SharedModule } from '../shared/shared.module';
import { PreferencesController } from './preferences.controller';

const PROVIDERS = [PreferencesRepository, UpsertPreferences, GetPreferences, DeletePreferencesUseCase];

@Module({
  imports: [SharedModule],
  providers: [...PROVIDERS],
  controllers: [PreferencesController],
  exports: [...PROVIDERS],
})
export class PreferencesModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {}
}
