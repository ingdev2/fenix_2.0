import { IRole } from 'src/utils/interfaces/auth/role.interface';
import { IPermissions } from 'src/utils/interfaces/auth/permissions.interface';

export interface Payload {
  sub: string;
  name: string;
  principal_email: string;
  user_id_type: number;
  id_number: number;
  role: IRole[];
  permissions: IPermissions[];
}
