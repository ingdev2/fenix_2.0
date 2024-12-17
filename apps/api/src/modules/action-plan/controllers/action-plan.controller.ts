import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';

import { ActionPlanService } from '../services/action-plan.service';
import { CreateActionPlanDto } from '../dto/create-action-plan.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesEnum } from 'src/utils/enums/roles.enum';
import { Auth } from 'src/modules/auth/decorators/auth.decorator';

@ApiTags('action-plan')
@ApiBearerAuth()
@Controller('action-plan')
export class ActionPlanController {
  constructor(private readonly actionPlanService: ActionPlanService) {}

  @Post('/createActionPlan/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  createActionPlan(@Body() createActionPlanDto: CreateActionPlanDto) {
    return this.actionPlanService.createActionPlan(createActionPlanDto);
  }

  @Get('/summaryActionPlan/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
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
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  listActionPlans() {
    return this.actionPlanService.findAllActionPlan();
  }

  @Get('/findOneActionPlan/:id')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  findOneActionPlan(@Param('id') id: number) {
    return this.actionPlanService.findOneActionPlan(id);
  }

  @Delete('/deleteActionPlan/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  deleteActionPlan(@Param('id') id: number) {
    return this.actionPlanService.deleteActionPlan(id);
  }
}
