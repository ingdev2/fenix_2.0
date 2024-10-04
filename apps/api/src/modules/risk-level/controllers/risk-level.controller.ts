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
import { RiskLevelService } from '../services/risk-level.service';
import { CreateRiskLevelDto } from '../dto/create-risk-level.dto';
import { UpdateRiskLevelDto } from '../dto/update-risk-level.dto';
import { ApiTags } from '@nestjs/swagger';
import { PermissionGuard } from 'src/utils/guards/permission.guard';
import { Permission } from 'src/utils/decorators/permission.decorator';
import { PermissionsEnum } from 'src/utils/enums/permissions.enum';

@ApiTags('risk-level')
@Controller('risk-level')
@UseGuards(PermissionGuard)
export class RiskLevelController {
  constructor(private readonly riskLevelService: RiskLevelService) {}

  @Post('/createRiskLevel/:userIdPermission')
  @Permission(PermissionsEnum.SUPER_ADMIN, PermissionsEnum.PARAMETERIZER)
  createRiskLevel(@Body() createRiskLevelDto: CreateRiskLevelDto) {
    return this.riskLevelService.createRiskLevel(createRiskLevelDto);
  }

  @Get('/listRiskLevels/')
  listRiskLevel() {
    return this.riskLevelService.findAllRiskLevel();
  }

  @Get('/findRiskLevel/:id/')
  findRiskLevel(@Param('id') id: number) {
    return this.riskLevelService.findOneRiskLevel(id);
  }

  @Patch('/updateRiskLevel/:id/:userIdPermission')
  @Permission(PermissionsEnum.SUPER_ADMIN, PermissionsEnum.PARAMETERIZER)
  updateRiskLevel(
    @Param('id') id: number,
    @Body() updateRiskLevelDto: UpdateRiskLevelDto,
  ) {
    return this.riskLevelService.updateRiskLevel(id, updateRiskLevelDto);
  }

  @Delete('/deleteRiskLevel/:id/:userIdPermission')
  @Permission(PermissionsEnum.SUPER_ADMIN, PermissionsEnum.PARAMETERIZER)
  deleteRiskLevel(@Param('id') id: number) {
    return this.riskLevelService.deleteRiskLevel(id);
  }
}
