import { Reflector } from '@nestjs/core';
import { ResourceEnum } from 'libs/shared';

export const ResourceCategory = Reflector.createDecorator<ResourceEnum>();
