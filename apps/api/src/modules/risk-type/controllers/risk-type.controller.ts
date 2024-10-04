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
import { RiskTypeService } from '../services/risk-type.service';
import { CreateRiskTypeDto } from '../dto/create-risk-type.dto';
import { UpdateRiskTypeDto } from '../dto/update-risk-type.dto';
import { ApiTags } from '@nestjs/swagger';
import { PermissionGuard } from 'src/utils/guards/permission.guard';
import { Permission } from 'src/utils/decorators/permission.decorator';
import { PermissionsEnum } from 'src/utils/enums/permissions.enum';

@ApiTags('risk-type')
@Controller('risk-type')
@UseGuards(PermissionGuard)
export class RiskTypeController {
  constructor(private readonly riskTypeService: RiskTypeService) {}

  @Post('/createRisktype/:userIdPermission')
  @Permission(PermissionsEnum.SUPER_ADMIN, PermissionsEnum.PARAMETERIZER)
  createRisktype(@Body() createRiskTypeDto: CreateRiskTypeDto) {
    return this.riskTypeService.createRiskType(createRiskTypeDto);
  }

  @Get('/listRisktypes/')
  listRisktypes() {
    return this.riskTypeService.findAllRiskTypes();
  }

  @Get('/findRisktype/:id/')
  findRisktype(@Param('id') id: number) {
    return this.riskTypeService.findOneRiskType(id);
  }

  @Patch('/updateRisktype/:id/:userIdPermission')
  @Permission(PermissionsEnum.SUPER_ADMIN, PermissionsEnum.PARAMETERIZER)
  updateRisktype(
    @Param('id') id: number,
    @Body() updateRiskTypeDto: UpdateRiskTypeDto,
  ) {
    return this.riskTypeService.updateRiskType(id, updateRiskTypeDto);
  }

  @Delete('/deleteRisktype/:id/:userIdPermission')
  @Permission(PermissionsEnum.SUPER_ADMIN, PermissionsEnum.PARAMETERIZER)
  deleteRisktype(@Param('id') id: number) {
    return this.riskTypeService.deleteRiskType(id);
  }
}
