import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ActionPlanService } from '../services/action-plan.service';
import { CreateActionPlanDto } from '../dto/create-action-plan.dto';
import { ApiTags } from '@nestjs/swagger';
import { PermissionGuard } from 'src/utils/guards/permission.guard';
import { Permission } from 'src/utils/decorators/permission.decorator';
import { PermissionsEnum } from 'src/utils/enums/permissions.enum';

@ApiTags('action-plan')
@Controller('action-plan')
@UseGuards(PermissionGuard)
export class ActionPlanController {
  constructor(private readonly actionPlanService: ActionPlanService) {}

  @Post('/createActionPlan/:userIdPermission')
  @Permission(
    PermissionsEnum.SUPER_ADMIN,
    PermissionsEnum.PARAMETERIZER,
    PermissionsEnum.ANALYST,
    PermissionsEnum.INVESTIGATOR,
  )
  createActionPlan(@Body() createActionPlanDto: CreateActionPlanDto) {
    return this.actionPlanService.createActionPlan(createActionPlanDto);
  }

  @Get('/summaryActionPlan/:userIdPermission')
  summaryActionPlan(
    @Query('actionPlanName') actionPlanName?: string,
    @Query('eventTypeId') eventTypeId?: number,
    @Query('eventId') eventId?: number,
  ) {
    return this.actionPlanService.summaryActionPlan(
      actionPlanName,
      eventTypeId,
      eventId,
    );
  }

  @Get('/listActionPlans/')
  listActionPlans() {
    return this.actionPlanService.findAllActionPlan();
  }

  @Get('/findOneActionPlan/:id')
  findOneActionPlan(@Param('id') id: number) {
    return this.actionPlanService.findOneActionPlan(id);
  }

  @Delete('/deleteActionPlan/:id/:userIdPermission')
  @Permission(PermissionsEnum.SUPER_ADMIN, PermissionsEnum.PARAMETERIZER)
  deleteActionPlan(@Param('id') id: number) {
    return this.actionPlanService.deleteActionPlan(id);
  }
}
