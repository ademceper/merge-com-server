import { Injectable } from '@nestjs/common';
import type { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import type { UserSessionData } from 'libs/shared';
import { parseSlugId } from './parse-slug-id';

@Injectable()
export class ParseSlugEnvironmentIdPipe implements PipeTransform<UserSessionData, UserSessionData> {
  transform(value: UserSessionData, metadata: ArgumentMetadata): UserSessionData {
    const { environmentId, ...userSession } = value;
    const parsedEnvironmentId = parseSlugId(environmentId);

    return {
      ...userSession,
      environmentId: parsedEnvironmentId,
    };
  }
}
