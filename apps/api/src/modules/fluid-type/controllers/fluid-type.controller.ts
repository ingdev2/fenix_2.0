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
import { FluidTypeService } from '../services/fluid-type.service';
import { CreateFluidTypeDto } from '../dto/create-fluid-type.dto';
import { UpdateFluidTypeDto } from '../dto/update-fluid-type.dto';
import { ApiTags } from '@nestjs/swagger';
import { PermissionGuard } from 'src/utils/guards/permission.guard';
import { Permission } from 'src/utils/decorators/permission.decorator';
import { PermissionsEnum } from 'src/utils/enums/permissions.enum';

@ApiTags('fluid-type')
@Controller('fluid-type')
@UseGuards(PermissionGuard)
export class FluidTypeController {
  constructor(private readonly fluidTypeService: FluidTypeService) {}

  @Post('/createFluidType/:userIdPermission')
  @Permission(PermissionsEnum.SUPER_ADMIN, PermissionsEnum.PARAMETERIZER)
  createFluidType(@Body() createFluidTypeDto: CreateFluidTypeDto) {
    return this.fluidTypeService.createFluidType(createFluidTypeDto);
  }

  @Get('/listFluidTypes/')
  listFluidType() {
    return this.fluidTypeService.findAllFluidTypes();
  }

  @Get('/findFluidType/:id/')
  findFluidType(@Param('id') id: number) {
    return this.fluidTypeService.findOneFluidType(id);
  }

  @Patch('/updateFluidType/:id/:userIdPermission')
  @Permission(PermissionsEnum.SUPER_ADMIN, PermissionsEnum.PARAMETERIZER)
  updateFluidTypes(
    @Param('id') id: number,
    @Body() updateFluidTypeDto: UpdateFluidTypeDto,
  ) {
    return this.fluidTypeService.updateFluidType(id, updateFluidTypeDto);
  }

  @Delete('/deleteFluidType/:id/:userIdPermission')
  @Permission(PermissionsEnum.SUPER_ADMIN, PermissionsEnum.PARAMETERIZER)
  deleteFluidTypes(@Param('id') id: number) {
    return this.fluidTypeService.deleteFluidType(id);
  }
}
