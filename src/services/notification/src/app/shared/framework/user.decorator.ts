import { createParamDecorator, UnauthorizedException } from '@nestjs/common';
import { UserSession } from 'libs/application-generic';
import { SubscriberEntity } from 'libs/dal';
import { ApiAuthSchemeEnum } from 'libs/shared';
import jwt from 'jsonwebtoken';

export { UserSession };

export interface SubscriberSession extends SubscriberEntity {
  organizationId: string;
  environmentId: string;
  contextKeys: string[];
  scheme: ApiAuthSchemeEnum;
}

export const SubscriberSession = createParamDecorator((data, ctx) => {
  const req = ctx.getType() === 'graphql' ? ctx.getArgs()[2].req : ctx.switchToHttp().getRequest();

  if (req.user) {
    return req.user;
  }

  const authorization = req.headers?.authorization;
  if (!authorization) {
    return null;
  }

  const tokenParts = authorization.split(' ');
  if (tokenParts[0] !== 'Bearer' || !tokenParts[1]) {
    throw new UnauthorizedException('bad_token');
  }

  return jwt.decode(tokenParts[1]);
});
