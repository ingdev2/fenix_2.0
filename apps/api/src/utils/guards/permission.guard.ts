import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from 'src/modules_bonnadonahub/user/services/user.service';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const requiredPermissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler(),
    );
    console.log('Permisos requeridos: ', requiredPermissions);
    if (!requiredPermissions) {
      return true;
    }

    const userIdPermission = context.switchToHttp().getRequest()
      .params.userIdPermission;
    console.log('id del usuario: ', userIdPermission);

    const permissions =
      await this.userService.getUserPermissions(userIdPermission);
    const hasPermission = permissions.some((permission) =>
      requiredPermissions.includes(permission.nombre),
    );

    if (!hasPermission) {
      throw new HttpException(
        'No tienes permisos para realizar esta acción',
        HttpStatus.FORBIDDEN,
      );
    }

    return hasPermission;
  }
}
