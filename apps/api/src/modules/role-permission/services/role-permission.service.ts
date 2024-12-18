import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateRolePermissionDto } from '../dto/create-role-permission.dto';
import { UpdateRolePermissionDto } from '../dto/update-role-permission.dto';

import { RolePermission } from '../entities/role-permission.entity';

@Injectable()
export class RolePermissionService {
  constructor(
    @InjectRepository(RolePermission)
    private readonly roleRepository: Repository<RolePermission>,
  ) {}

  async createRole(createRoleDto: CreateRolePermissionDto) {
    if (!createRoleDto || !createRoleDto.role_name) {
      throw new HttpException(
        'El nombre del rol es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const findRole = await this.roleRepository.findOne({
      where: {
        role_name: createRoleDto.role_name,
        role_status: true,
      },
    });

    if (findRole) {
      throw new HttpException(
        'El rol ya existe.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    const role = this.roleRepository.create(createRoleDto);
    await this.roleRepository.save(role);

    return new HttpException(
      `¡El rol ${role.role_name} se creó correctamente!`,
      HttpStatus.CREATED,
    );
  }

  async findAllRoles() {
    const roles = await this.roleRepository.find({
      where: {
        role_status: true,
      },
      order: {
        role_name: 'ASC',
      },
    });

    if (roles.length === 0) {
      throw new HttpException(
        'No se encontró la lista de roles',
        HttpStatus.NOT_FOUND,
      );
    }
    return roles;
  }

  async findOneRole(id: number) {
    if (!id) {
      throw new HttpException(
        'El identificador del rol es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const role = await this.roleRepository.findOne({
      where: { id, role_status: true },
    });

    if (!role) {
      throw new HttpException('No se encontró el rol', HttpStatus.NOT_FOUND);
    }

    return role;
  }

  async findRoleByName(roleName: string) {
    if (!roleName) {
      throw new HttpException(
        'El nombre del rol es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const roleNameFound = await this.roleRepository.findOne({
      where: { role_name: roleName, role_status: true },
    });

    if (!roleNameFound) {
      throw new HttpException(
        'No se encontró el nombre del rol',
        HttpStatus.NOT_FOUND,
      );
    }

    return roleNameFound;
  }

  async updateRole(id: number, updateRoleDto: UpdateRolePermissionDto) {
    if (!updateRoleDto) {
      return new HttpException(
        'Los datos para actualizar el rol son requeridos.',
        HttpStatus.BAD_REQUEST,
      );
    }

    this.findOneRole(id);
    const result = await this.roleRepository.update(id, updateRoleDto);

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo actualizar el rol`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return new HttpException(
      `¡Datos actualizados correctamente!`,
      HttpStatus.OK,
    );
  }

  async deleteRole(id: number) {
    const roleFound = await this.roleRepository.findOneBy({ id });

    if (!roleFound) {
      return new HttpException(
        `Rol no encontrado, favor recargar.`,
        HttpStatus.NOT_FOUND,
      );
    }

    const result = await this.roleRepository.softDelete(id);

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo eliminar el rol`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(`¡Datos eliminados correctamente!`, HttpStatus.OK);
  }
}
