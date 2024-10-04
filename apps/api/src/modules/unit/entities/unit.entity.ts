import { ActionPlan } from 'src/modules/action-plan/entities/action-plan.entity';
import { Event } from 'src/modules/event/entities/event.entity';
import { Service } from 'src/modules/service/entities/service.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'fenix_unit' })
export class Unit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  unit_name: string;

  @Column({ type: 'varchar', nullable: true })
  unit_description: string;

  @Column({ default: true })
  unit_status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Service, (service) => service.unit)
  service: Service[];

  @OneToMany(() => ActionPlan, (actionPlan) => actionPlan.unit)
  actionPlan: ActionPlan[];

  @OneToMany(() => Event, (event) => event.unit)
  event: Event[];
}
