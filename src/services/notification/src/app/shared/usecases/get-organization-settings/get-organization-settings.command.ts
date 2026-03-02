import { BaseCommand } from 'libs/application-generic';
import { OrganizationEntity } from 'libs/dal';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class GetOrganizationSettingsCommand extends BaseCommand {
  @IsNotEmpty()
  readonly organizationId: string;

  @IsOptional()
  readonly organization?: OrganizationEntity;
}
