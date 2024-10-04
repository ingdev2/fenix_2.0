import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { DamageTypeService } from '../services/damage-type.service';
import { CreateDamageTypeDto } from '../dto/create-damage-type.dto';
import { UpdateDamageTypeDto } from '../dto/update-damage-type.dto';
import { ApiTags } from '@nestjs/swagger';
import { PermissionGuard } from 'src/utils/guards/permission.guard';
import { Permission } from 'src/utils/decorators/permission.decorator';
import { PermissionsEnum } from 'src/utils/enums/permissions.enum';

@ApiTags('damage-type')
@Controller('damage-type')
@UseGuards(PermissionGuard)
export class DamageTypeController {
  constructor(private readonly damageTypeService: DamageTypeService) {}

  @Post('/createDamageType/:userIdPermission')
  @Permission(PermissionsEnum.SUPER_ADMIN, PermissionsEnum.PARAMETERIZER)
  createDamageType(@Body() createDamageTypeDto: CreateDamageTypeDto) {
    return this.damageTypeService.createDamageType(createDamageTypeDto);
  }

  @Get('/listDamageTypes/')
  listDamageTypes() {
    return this.damageTypeService.findAllDamageType();
  }

  @Get('/findDamageType/:id')
  findDamageType(@Param('id') id: number) {
    return this.damageTypeService.findOneDamageType(id);
  }

  @Patch('/updateDamageType/:id/:userIdPermission')
  @Permission(PermissionsEnum.SUPER_ADMIN, PermissionsEnum.PARAMETERIZER)
  updateDamageType(
    @Param('id') id: number,
    @Body() updateDamageTypeDto: UpdateDamageTypeDto,
  ) {
    return this.damageTypeService.updateDamageType(id, updateDamageTypeDto);
  }

  @Delete('/deleteDamageType/:id/:userIdPermission')
  @Permission(PermissionsEnum.SUPER_ADMIN, PermissionsEnum.PARAMETERIZER)
  deleteDamageType(@Param('id') id: number) {
    return this.damageTypeService.deleteDamageType(id);
  }
}
