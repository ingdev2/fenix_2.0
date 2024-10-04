import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Ip,
  UseGuards,
} from '@nestjs/common';
import { SynergyService } from '../services/synergy.service';
import { CreateSynergyDto } from '../dto/create-synergy.dto';
import { ApiTags } from '@nestjs/swagger';
import { PermissionGuard } from 'src/utils/guards/permission.guard';
import { Permission } from 'src/utils/decorators/permission.decorator';
import { PermissionsEnum } from 'src/utils/enums/permissions.enum';

@ApiTags('synergy')
@Controller('synergy')
@UseGuards(PermissionGuard)
export class SynergyController {
  constructor(private readonly synergyService: SynergyService) {}

  @Post('/createSynergy/:idValidator/:userIdPermission')
  @Permission(PermissionsEnum.SUPER_ADMIN, PermissionsEnum.VALIDATOR)
  createSynergy(
    @Body() createSynergyDto: CreateSynergyDto[],
    @Ip() clientIp: string,
    @Param('idValidator') idValidator: string,
  ) {
    return this.synergyService.createSynergy(
      createSynergyDto,
      clientIp,
      idValidator,
    );
  }

  @Get('/listSynergies/:userIdPermission')
  @Permission(PermissionsEnum.SUPER_ADMIN, PermissionsEnum.VALIDATOR)
  listSynergies() {
    return this.synergyService.findAllSynergy();
  }

  @Get('/findSynergy/:id/:userIdPermission')
  @Permission(PermissionsEnum.SUPER_ADMIN, PermissionsEnum.VALIDATOR)
  findSynergy(@Param('id') id: number) {
    return this.synergyService.findOneSynergy(id);
  }

  // @Patch('/rescheduleSynergy/:id/:idValidator/:userIdPermission')
  // @Permission(permissions.SUPER_ADMIN, permissions.VALIDATOR)
  // rescheduleSynergy(
  //   @Param('id') id: number,
  //   @Ip() clientIp: string,
  //   @Param('idValidator') idValidator: string,
  // ) {
  //   return this.synergyService.rescheduleSynergy(id, clientIp, idValidator);
  // }

  @Patch('/resolutionSynergy/:id/:idValidator/:userIdPermission')
  @Permission(PermissionsEnum.SUPER_ADMIN, PermissionsEnum.VALIDATOR)
  resolutionSynergy(
    @Param('id') id: number,
    @Ip() clientIp: string,
    @Param('idValidator') idValidator: string,
  ) {
    return this.synergyService.resolutionSynergy(id, clientIp, idValidator);
  }

  @Delete('/deleteSynergy/:id/:userIdPermission')
  @Permission(PermissionsEnum.SUPER_ADMIN, PermissionsEnum.VALIDATOR)
  deleteSynergy(@Param('id') id: number) {
    return this.synergyService.deleteSynergy(id);
  }
}
