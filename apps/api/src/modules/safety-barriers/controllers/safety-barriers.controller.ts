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
import { SafetyBarriersService } from '../services/safety-barriers.service';
import { CreateSafetyBarrierDto } from '../dto/create-safety-barrier.dto';
import { UpdateSafetyBarrierDto } from '../dto/update-safety-barrier.dto';
import { ApiTags } from '@nestjs/swagger';
import { PermissionGuard } from 'src/utils/guards/permission.guard';
import { Permission } from 'src/utils/decorators/permission.decorator';
import { PermissionsEnum } from 'src/utils/enums/permissions.enum';

@ApiTags('safety-barriers')
@Controller('safety-barriers')
@UseGuards(PermissionGuard)
export class SafetyBarriersController {
  constructor(private readonly safetyBarriersService: SafetyBarriersService) {}

  @Post('/createSafetyBarrier/:userIdPermission')
  @Permission(PermissionsEnum.SUPER_ADMIN, PermissionsEnum.PARAMETERIZER)
  createSafetyBarrier(@Body() createSafetyBarrierDto: CreateSafetyBarrierDto) {
    return this.safetyBarriersService.createSafetyBarrier(
      createSafetyBarrierDto,
    );
  }

  @Get('/listSafetyBarriers')
  listSafetyBarriers() {
    return this.safetyBarriersService.findAllSafetyBarriers();
  }

  @Get('/findSafetyBarrier/:id')
  findSafetyBarrier(@Param('id') id: number) {
    return this.safetyBarriersService.findOneSafetyBarrier(id);
  }

  @Patch('/updateSafetyBarrier/:id/:userIdPermission')
  @Permission(PermissionsEnum.SUPER_ADMIN, PermissionsEnum.PARAMETERIZER)
  updateSafetyBarrier(
    @Param('id') id: number,
    @Body() updateSafetyBarrierDto: UpdateSafetyBarrierDto,
  ) {
    return this.safetyBarriersService.updateSafetyBarrier(
      id,
      updateSafetyBarrierDto,
    );
  }

  @Delete('/deleteSafetyBarrier/:id/:userIdPermission')
  @Permission(PermissionsEnum.SUPER_ADMIN, PermissionsEnum.PARAMETERIZER)
  deleteSafetyBarrier(@Param('id') id: number) {
    return this.safetyBarriersService.deleteSafetyBarrier(id);
  }
}
