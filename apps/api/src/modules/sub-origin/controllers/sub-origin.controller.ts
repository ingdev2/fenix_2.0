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
import { SubOriginService } from '../services/sub-origin.service';
import { CreateSubOriginDto } from '../dto/create-sub-origin.dto';
import { UpdateSubOriginDto } from '../dto/update-sub-origin.dto';
import { ApiTags } from '@nestjs/swagger';
import { PermissionGuard } from 'src/utils/guards/permission.guard';
import { Permission } from 'src/utils/decorators/permission.decorator';
import { PermissionsEnum } from 'src/utils/enums/permissions.enum';

@ApiTags('sub-origin')
@Controller('sub-origin')
@UseGuards(PermissionGuard)
export class SubOriginController {
  constructor(private readonly subOriginService: SubOriginService) {}

  @Post('/createSubOrigin/:userIdPermission')
  @Permission(PermissionsEnum.SUPER_ADMIN, PermissionsEnum.PARAMETERIZER)
  createSubOrigin(@Body() createSubOriginDto: CreateSubOriginDto) {
    return this.subOriginService.createSubOrigin(createSubOriginDto);
  }

  @Get('/listSubOrigins/')
  listSubOrigins() {
    return this.subOriginService.findAllSubOrigins();
  }

  @Get('/findSubOrigin/:id/')
  findSubOrigin(@Param('id') id: number) {
    return this.subOriginService.findOneSubOrigin(id);
  }

  @Get('/findSubOriginByOriginId/:originId')
  findSubOriginByOriginId(@Param('originId') originId: number) {
    return this.subOriginService.findSubOriginByOriginId(originId);
  }

  @Patch('/updateSubOrigin/:id/:userIdPermission')
  @Permission(PermissionsEnum.SUPER_ADMIN, PermissionsEnum.PARAMETERIZER)
  updateSubOrigin(
    @Param('id') id: number,
    @Body() updateSubOriginDto: UpdateSubOriginDto,
  ) {
    return this.subOriginService.updateSubOrigin(id, updateSubOriginDto);
  }

  @Delete('/deleteSubOrigin/:id/:userIdPermission')
  @Permission(PermissionsEnum.SUPER_ADMIN, PermissionsEnum.PARAMETERIZER)
  deleteSubOrigin(@Param('id') id: number) {
    return this.subOriginService.deleteSubOrigin(id);
  }
}
