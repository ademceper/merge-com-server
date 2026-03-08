import type { CustomDataType } from '../../types';

export interface IConstructTenantDto {
  data?: CustomDataType;
}

interface ICreateTenantDto extends IConstructTenantDto {
  name: string;
  identifier: string;
}
