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
import { UnsafeActionService } from '../services/unsafe-action.service';
import { CreateUnsafeActionDto } from '../dto/create-unsafe-action.dto';
import { UpdateUnsafeActionDto } from '../dto/update-unsafe-action.dto';
import { ApiTags } from '@nestjs/swagger';
import { PermissionGuard } from 'src/utils/guards/permission.guard';
import { Permission } from 'src/utils/decorators/permission.decorator';
import { PermissionsEnum } from 'src/utils/enums/permissions.enum';

@ApiTags('unsafe-action')
@Controller('unsafe-action')
@UseGuards(PermissionGuard)
export class UnsafeActionController {
  constructor(private readonly unsafeActionService: UnsafeActionService) {}

  @Post('/createUnsafeAction/:userIdPermission')
  @Permission(PermissionsEnum.SUPER_ADMIN, PermissionsEnum.PARAMETERIZER)
  createUnsafeAction(@Body() createUnsafeActionDto: CreateUnsafeActionDto) {
    return this.unsafeActionService.createUnsafeAction(createUnsafeActionDto);
  }

  @Get('/listUnsafeActions/')
  listUnsafeActions() {
    return this.unsafeActionService.findAllUnsafeActions();
  }

  @Get('/findUnsafeAction/:id/')
  findUnsafeAction(@Param('id') id: number) {
    return this.unsafeActionService.findOneUnsafeActions(id);
  }

  @Patch('/updateUnsafeAction/:id/:userIdPermission')
  @Permission(PermissionsEnum.SUPER_ADMIN, PermissionsEnum.PARAMETERIZER)
  updateUnsafeAction(
    @Param('id') id: number,
    @Body() updateUnsafeActionDto: UpdateUnsafeActionDto,
  ) {
    return this.unsafeActionService.updateUnsafeAction(
      id,
      updateUnsafeActionDto,
    );
  }

  @Delete('/deleteUnsafeAction/:id/:userIdPermission')
  @Permission(PermissionsEnum.SUPER_ADMIN, PermissionsEnum.PARAMETERIZER)
  deleteUnsafeAction(@Param('id') id: number) {
    return this.unsafeActionService.deleteUnsafeAction(id);
  }
}
