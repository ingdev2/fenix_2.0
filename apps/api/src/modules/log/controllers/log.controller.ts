import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { LogService } from '../services/log.service';
import { CreateLogDto } from '../dto/create-log.dto';
import { ApiTags } from '@nestjs/swagger';
import { PermissionGuard } from 'src/utils/guards/permission.guard';
import { Permission } from 'src/utils/decorators/permission.decorator';
import { PermissionsEnum } from 'src/utils/enums/permissions.enum';

@ApiTags('log')
@Controller('log')
@UseGuards(PermissionGuard)
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Post('/createLog/:userIdPermission')
  @Permission(PermissionsEnum.SUPER_ADMIN)
  createLog(@Body() createLogDto: CreateLogDto) {
    return this.logService.createLog(
      createLogDto.log_validatedcase_id_fk,
      createLogDto.log_user_id,
      createLogDto.log_ip,
      createLogDto.log_action,
    );
  }

  @Get('/listLogs/:userIdPermission')
  @Permission(PermissionsEnum.SUPER_ADMIN)
  listLogs() {
    return this.logService.findAllLogs();
  }

  @Get('/findOneLog/:id/:userIdPermission')
  @Permission(PermissionsEnum.SUPER_ADMIN)
  findOneLog(@Param('id') id: number) {
    return this.logService.findOneLog(id);
  }

  @Delete('/deleteLog/:id/:userIdPermission')
  @Permission(PermissionsEnum.SUPER_ADMIN)
  deleteLog(@Param('id') id: number) {
    return this.logService.deleteLog(id);
  }
}
