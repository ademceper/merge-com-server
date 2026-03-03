import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY, NO_PERMISSIONS_KEY } from 'libs/application-generic';
import type { PermissionsEnum, UserSessionData } from 'libs/shared';
import { IS_PUBLIC_KEY } from './public.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const skipPermissions = this.reflector.getAllAndOverride<boolean>(NO_PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (skipPermissions) return true;

    const requiredPermissions = this.reflector.getAllAndOverride<PermissionsEnum[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredPermissions || requiredPermissions.length === 0) return true;

    const request = context.switchToHttp().getRequest();
    const user: UserSessionData | undefined = request.user;

    if (!user) {
      throw new ForbiddenException('No user session found');
    }

    const hasAllPermissions = requiredPermissions.every((perm) => user.permissions.includes(perm));
    if (!hasAllPermissions) {
      throw new ForbiddenException('Insufficient permissions');
    }

    return true;
  }
}
