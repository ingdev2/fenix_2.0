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
import { DeviceTypeService } from '../services/device-type.service';
import { CreateDeviceTypeDto } from '../dto/create-device-type.dto';
import { UpdateDeviceTypeDto } from '../dto/update-device-type.dto';
import { ApiTags } from '@nestjs/swagger';
import { PermissionGuard } from 'src/utils/guards/permission.guard';
import { Permission } from 'src/utils/decorators/permission.decorator';
import { PermissionsEnum } from 'src/utils/enums/permissions.enum';

@ApiTags('device-type')
@Controller('device-type')
@UseGuards(PermissionGuard)
export class DeviceTypeController {
  constructor(private readonly deviceTypeService: DeviceTypeService) {}

  @Post('/createDeviceType/:userIdPermission')
  @Permission(PermissionsEnum.SUPER_ADMIN, PermissionsEnum.PARAMETERIZER)
  createDeviceType(@Body() createDeviceTypeDto: CreateDeviceTypeDto) {
    return this.deviceTypeService.createDeviceType(createDeviceTypeDto);
  }

  @Get('/listDeviceTypes/')
  listDeviceTypes() {
    return this.deviceTypeService.findAllDeviceTypes();
  }

  @Get('/findDeviceType/:id')
  findDeviceType(@Param('id') id: number) {
    return this.deviceTypeService.findOneDeviceType(id);
  }

  @Patch('/updateDeviceType/:id/:userIdPermission')
  @Permission(PermissionsEnum.SUPER_ADMIN, PermissionsEnum.PARAMETERIZER)
  updateDeviceType(
    @Param('id') id: number,
    @Body() updateDeviceTypeDto: UpdateDeviceTypeDto,
  ) {
    return this.deviceTypeService.updateDeviceType(id, updateDeviceTypeDto);
  }

  @Delete('/deleteDeviceType/:id/:userIdPermission')
  @Permission(PermissionsEnum.SUPER_ADMIN, PermissionsEnum.PARAMETERIZER)
  deleteDeviceType(@Param('id') id: number) {
    return this.deviceTypeService.deleteDeviceType(id);
  }
}
