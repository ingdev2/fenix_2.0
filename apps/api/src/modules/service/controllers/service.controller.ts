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
import { ServiceService } from '../services/service.service';
import { CreateServiceDto } from '../dto/create-service.dto';
import { UpdateServiceDto } from '../dto/update-service.dto';
import { ApiTags } from '@nestjs/swagger';
import { PermissionGuard } from 'src/utils/guards/permission.guard';
import { Permission } from 'src/utils/decorators/permission.decorator';
import { PermissionsEnum } from 'src/utils/enums/permissions.enum';

@ApiTags('service')
@Controller('service')
@UseGuards(PermissionGuard)
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post('/createService/:userIdPermission')
  @Permission(PermissionsEnum.SUPER_ADMIN, PermissionsEnum.PARAMETERIZER)
  createService(@Body() createServiceDto: CreateServiceDto) {
    return this.serviceService.createService(createServiceDto);
  }

  @Get('/listServices/')
  listServices() {
    return this.serviceService.findAllServices();
  }

  @Get('/findService/:id/')
  findService(@Param('id') id: number) {
    return this.serviceService.findOneService(id);
  }

  @Patch('/updateService/:id/:userIdPermission')
  @Permission(PermissionsEnum.SUPER_ADMIN, PermissionsEnum.PARAMETERIZER)
  updateService(
    @Param('id') id: number,
    @Body() updateServiceDto: UpdateServiceDto,
  ) {
    return this.serviceService.updateService(id, updateServiceDto);
  }

  @Delete('/deleteService/:id/:userIdPermission')
  @Permission(PermissionsEnum.SUPER_ADMIN, PermissionsEnum.PARAMETERIZER)
  deleteService(@Param('id') id: number) {
    return this.serviceService.deleteService(id);
  }
}
