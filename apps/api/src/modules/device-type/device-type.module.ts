import { Module } from '@nestjs/common';
import { DeviceTypeService } from './services/device-type.service';
import { DeviceTypeController } from './controllers/device-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeviceType } from './entities/device-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DeviceType])],
  controllers: [DeviceTypeController],
  providers: [DeviceTypeService],
  exports: [DeviceTypeService],
})
export class DeviceTypeModule {}
