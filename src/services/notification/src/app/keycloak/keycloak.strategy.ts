import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import type { Request } from 'express';
import { type UserSessionData, ApiAuthSchemeEnum, MemberRoleEnum, ROLE_PERMISSIONS } from 'libs/shared';

interface KeycloakJwtPayload {
  sub: string;
  email?: string;
  given_name?: string;
  family_name?: string;
  preferred_username?: string;
  picture?: string;
  realm_access?: { roles: string[] };
  resource_access?: Record<string, { roles: string[] }>;
  organizationId?: string;
  org_id?: string;
}

const KEYCLOAK_ROLE_MAP: Record<string, MemberRoleEnum> = {
  owner: MemberRoleEnum.OWNER,
  admin: MemberRoleEnum.ADMIN,
  author: MemberRoleEnum.AUTHOR,
  viewer: MemberRoleEnum.VIEWER,
};

@Injectable()
export class KeycloakStrategy extends PassportStrategy(Strategy, 'jwt') {
  private readonly logger = new Logger(KeycloakStrategy.name);

  constructor() {
    const keycloakUrl = process.env.KEYCLOAK_URL;
    const realm = process.env.KEYCLOAK_REALM;

    if (!keycloakUrl || !realm) {
      Logger.warn('KEYCLOAK_URL or KEYCLOAK_REALM not set. JWT auth will fail at runtime.', KeycloakStrategy.name);
    }

    const jwksUri = `${keycloakUrl}/realms/${realm}/protocol/openid-connect/certs`;
    const issuer = `${keycloakUrl}/realms/${realm}`;

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 10,
        jwksUri,
      }),
      issuer,
      algorithms: ['RS256'],
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: KeycloakJwtPayload): UserSessionData {
    const roles = this.mapRoles(payload);
    const permissions = this.resolvePermissions(roles);

    return {
      _id: payload.sub,
      email: payload.email,
      firstName: payload.given_name,
      lastName: payload.family_name,
      profilePicture: payload.picture,
      organizationId: payload.organizationId || payload.org_id || '',
      environmentId: (req.headers['novu-environment-id'] as string) || '',
      roles,
      permissions,
      scheme: ApiAuthSchemeEnum.BEARER,
    };
  }

  private mapRoles(payload: KeycloakJwtPayload): MemberRoleEnum[] {
    const realmRoles = payload.realm_access?.roles || [];

    const mapped: MemberRoleEnum[] = [];
    for (const role of realmRoles) {
      const normalised = role.toLowerCase();
      if (KEYCLOAK_ROLE_MAP[normalised]) {
        mapped.push(KEYCLOAK_ROLE_MAP[normalised]);
      }
    }

    // Default to VIEWER if no known role matched
    if (mapped.length === 0) {
      mapped.push(MemberRoleEnum.VIEWER);
    }

    return mapped;
  }

  private resolvePermissions(roles: MemberRoleEnum[]): UserSessionData['permissions'] {
    const permissionSet = new Set<UserSessionData['permissions'][number]>();
    for (const role of roles) {
      const perms = ROLE_PERMISSIONS[role];
      if (perms) {
        for (const p of perms) {
          permissionSet.add(p);
        }
      }
    }

    return [...permissionSet];
  }
}
