import { Injectable } from '@nestjs/common';
import { CreateActionPlanActivityDto } from '../dto/create-action-plan-activity.dto';
import { UpdateActionPlanActivityDto } from '../dto/update-action-plan-activity.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ActionPlanActivity } from '../entities/action-plan-activity.entity';
import { QueryRunner, Repository } from 'typeorm';

@Injectable()
export class ActionPlanActivitiesService {
  constructor(
    @InjectRepository(ActionPlanActivity)
    private readonly actionPlanActivityRepository: Repository<ActionPlanActivity>,
  ) {}
  async createActionPlanActivity(
    actionPlanActivities: CreateActionPlanActivityDto[],
    actionPlanId: number,
  ) {
    const existingActionPlanActivity =
      await this.actionPlanActivityRepository.find({
        where: { plan_aa_actionplan_id_fk: actionPlanId, plan_aa_status: true },
      });

    if (existingActionPlanActivity.length > 0) {
      await this.actionPlanActivityRepository.softRemove(
        existingActionPlanActivity,
      );
    }

    for (const actionPlanActivity of actionPlanActivities) {
      const actionPA = this.actionPlanActivityRepository.create({
        ...actionPlanActivity,
        plan_aa_actionplan_id_fk: actionPlanId,
      });

      await this.actionPlanActivityRepository.save(actionPA);
    }
  }

}
