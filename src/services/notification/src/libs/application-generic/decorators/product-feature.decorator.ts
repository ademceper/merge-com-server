import { Reflector } from '@nestjs/core';
import { ProductFeatureKeyEnum } from 'libs/shared';

export const ProductFeature = Reflector.createDecorator<ProductFeatureKeyEnum>();
