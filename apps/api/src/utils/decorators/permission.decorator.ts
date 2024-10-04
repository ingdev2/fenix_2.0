import { SetMetadata } from '@nestjs/common';
import { PermissionsEnum } from 'src/utils/enums/permissions.enum';

export const Permission = (...permissions: PermissionsEnum[]) =>
  SetMetadata('permissions', permissions);
