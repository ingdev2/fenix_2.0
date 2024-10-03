import { Module } from '@nestjs/common';
import { PriorityService } from './services/priority.service';
import { PriorityController } from './controllers/priority.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Priority } from './entities/priority.entity';
import { SeverityClasificationModule } from '../severity-clasification/severity-clasification.module';
import { UserModule } from 'src/modules_bonnadonahub/user/user.module';
import { PermissionGuard } from 'src/utils/guards/permission.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([Priority]),
    SeverityClasificationModule,
    UserModule,
  ],
  controllers: [PriorityController],
  providers: [PriorityService, PermissionGuard],
  exports: [PriorityService],
})
export class PriorityModule {}