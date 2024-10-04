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
import { UnitService } from '../services/unit.service';
import { CreateUnitDto } from '../dto/create-unit.dto';
import { UpdateUnitDto } from '../dto/update-unit.dto';
import { ApiTags } from '@nestjs/swagger';
import { PermissionGuard } from 'src/utils/guards/permission.guard';
import { PermissionsEnum } from 'src/utils/enums/permissions.enum';
import { Permission } from 'src/utils/decorators/permission.decorator';

@ApiTags('unit')
@Controller('unit')
@UseGuards(PermissionGuard)
export class UnitController {
  constructor(private readonly unitService: UnitService) {}

  @Post('/createUnit/:userIdPermission')
  @Permission(PermissionsEnum.SUPER_ADMIN, PermissionsEnum.PARAMETERIZER)
  createUnit(@Body() createUnitDto: CreateUnitDto) {
    return this.unitService.createUnit(createUnitDto);
  }

  @Get('/listUnits/')
  listUnits() {
    return this.unitService.findAllUnits();
  }

  @Get('/findUnit/:id/')
  findUnit(@Param('id') id: number) {
    return this.unitService.findOneUnit(id);
  }

  @Patch('/updateUnit/:id/:userIdPermission')
  @Permission(PermissionsEnum.SUPER_ADMIN, PermissionsEnum.PARAMETERIZER)
  updateUnit(@Param('id') id: number, @Body() updateUnitDto: UpdateUnitDto) {
    return this.unitService.updateUnit(id, updateUnitDto);
  }

  @Delete('/deleteUnit/:id/:userIdPermission')
  @Permission(PermissionsEnum.SUPER_ADMIN, PermissionsEnum.PARAMETERIZER)
  deleteUnit(@Param('id') id: number) {
    return this.unitService.deleteUnit(id);
  }
}
