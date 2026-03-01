import { BaseCommand } from 'libs/application-generic';
import { AuthProviderEnum } from 'libs/shared';

export class CreateUserCommand extends BaseCommand {
  email: string;

  firstName?: string | null;

  lastName?: string | null;

  picture?: string;

  auth: {
    username?: string;
    profileId: string;
    provider: AuthProviderEnum;
    accessToken: string;
    refreshToken: string;
  };
}
