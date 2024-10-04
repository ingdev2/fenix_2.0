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
import { PositionService } from '../services/position.service';
import { CreatePositionDto } from '../dto/create-position.dto';
import { ApiTags } from '@nestjs/swagger';
import { UpdatePositionDto } from '../dto/update-position.dto';
import { PermissionGuard } from 'src/utils/guards/permission.guard';
import { Permission } from 'src/utils/decorators/permission.decorator';
import { PermissionsEnum } from 'src/utils/enums/permissions.enum';

@ApiTags('position')
@Controller('position')
@UseGuards(PermissionGuard)
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  @Post('/createPosition/:userIdPermission')
  @Permission(PermissionsEnum.SUPER_ADMIN, PermissionsEnum.PARAMETERIZER)
  createPosition(@Body() createPositionDto: CreatePositionDto) {
    return this.positionService.createPosition(createPositionDto);
  }

  @Post('/synchronizePositions')
  syncronizePositions() {
    return this.positionService.synchronizePositions();
  }

  @Get('/listPositions')
  listPositions() {
    return this.positionService.findAllPosition();
  }

  @Get('/findPosition/:id')
  findPosition(@Param('id') id: number) {
    return this.positionService.findOnePosition(id);
  }

  @Get('/findEmployeeByCode/:code')
  findEmployeeByCode(@Param('code') code: number) {
    return this.positionService.findEmployeeByCode(code);
  }

  @Patch('/updatePosition/:id/:userIdPermission')
  @Permission(PermissionsEnum.SUPER_ADMIN, PermissionsEnum.PARAMETERIZER)
  updatePosition(
    @Param('id') id: number,
    @Body() updatePositionDto: UpdatePositionDto,
  ) {
    return this.positionService.updatePosition(id, updatePositionDto);
  }

  @Delete('/deletePosition/:id/:userIdPermission')
  @Permission(PermissionsEnum.SUPER_ADMIN, PermissionsEnum.PARAMETERIZER)
  async deletePosition(@Param('id') id: number) {
    return await this.positionService.deletePosition(id);
  }
}
