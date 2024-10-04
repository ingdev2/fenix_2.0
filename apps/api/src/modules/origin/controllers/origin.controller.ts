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
import { OriginService } from '../services/origin.service';
import { CreateOriginDto } from '../dto/create-origin.dto';
import { UpdateOriginDto } from '../dto/update-origin.dto';
import { ApiTags } from '@nestjs/swagger';
import { PermissionGuard } from 'src/utils/guards/permission.guard';
import { Permission } from 'src/utils/decorators/permission.decorator';
import { PermissionsEnum } from 'src/utils/enums/permissions.enum';

@ApiTags('origin')
@Controller('origin')
@UseGuards(PermissionGuard)
export class OriginController {
  constructor(private readonly originService: OriginService) {}

  @Post('/createOrigin/:userIdPermission')
  @Permission(PermissionsEnum.SUPER_ADMIN, PermissionsEnum.PARAMETERIZER)
  createOrigin(@Body() createOriginDto: CreateOriginDto) {
    return this.originService.createOrigin(createOriginDto);
  }

  @Get('/listOrigins/')
  listOrigins() {
    return this.originService.findAllOrigins();
  }

  @Get('/findOrigin/:id/')
  findOrigin(@Param('id') id: number) {
    return this.originService.findOneOrigin(id);
  }

  @Patch('/updateOrigin/:id/:userIdPermission')
  @Permission(PermissionsEnum.SUPER_ADMIN, PermissionsEnum.PARAMETERIZER)
  updateOrigin(
    @Param('id') id: number,
    @Body() updateOriginDto: UpdateOriginDto,
  ) {
    return this.originService.updateOrigin(id, updateOriginDto);
  }

  @Delete('/deleteOrigin/:id/:userIdPermission')
  @Permission(PermissionsEnum.SUPER_ADMIN, PermissionsEnum.PARAMETERIZER)
  deleteOrigin(@Param('id') id: number) {
    return this.originService.deleteOrigin(id);
  }
}
