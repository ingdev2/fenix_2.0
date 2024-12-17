import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { ActionPlanActivitiesService } from '../services/action-plan-activities.service';
import { UpdateActionPlanActivityDto } from '../dto/update-action-plan-activity.dto';

@Controller('action-plan-activities')
export class ActionPlanActivitiesController {
  constructor(
    private readonly actionPlanActivitiesService: ActionPlanActivitiesService,
  ) {}
}
