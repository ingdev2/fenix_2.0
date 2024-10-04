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
import { ReasonReturnCaseService } from '../services/reason-return-case.service';
import { CreateReasonReturnCaseDto } from '../dto/create-reason-return-case.dto';
import { UpdateReasonReturnCaseDto } from '../dto/update-reason-return-case.dto';
import { ApiTags } from '@nestjs/swagger';
import { PermissionGuard } from 'src/utils/guards/permission.guard';
import { Permission } from 'src/utils/decorators/permission.decorator';
import { PermissionsEnum } from 'src/utils/enums/permissions.enum';

@ApiTags('reason-return-case')
@Controller('reason-return-case')
@UseGuards(PermissionGuard)
export class ReasonReturnCaseController {
  constructor(
    private readonly reasonReturnCaseService: ReasonReturnCaseService,
  ) {}

  @Post('/createReasonReturnCase/:userIdPermission')
  @Permission(PermissionsEnum.SUPER_ADMIN, PermissionsEnum.PARAMETERIZER)
  create(@Body() createReasonReturnCaseDto: CreateReasonReturnCaseDto) {
    return this.reasonReturnCaseService.createReasonReturnCase(
      createReasonReturnCaseDto,
    );
  }

  @Get('/listReasonReturnCases/')
  listReasonReturnCases() {
    return this.reasonReturnCaseService.findAllReasonReturnCases();
  }

  @Get('/findReasonReturnCase/:id/')
  findReasonReturnCase(@Param('id') id: number) {
    return this.reasonReturnCaseService.findOneReasonReturnCase(id);
  }

  @Patch('/updateReasonReturnCase/:id/:userIdPermission')
  @Permission(PermissionsEnum.SUPER_ADMIN, PermissionsEnum.PARAMETERIZER)
  updateReasonReturnCase(
    @Param('id') id: number,
    @Body() updateReasonReturnCaseDto: UpdateReasonReturnCaseDto,
  ) {
    return this.reasonReturnCaseService.updateReasonReturnCase(
      id,
      updateReasonReturnCaseDto,
    );
  }

  @Delete('/deleteReasonReturnCase/:id/:userIdPermission')
  @Permission(PermissionsEnum.SUPER_ADMIN, PermissionsEnum.PARAMETERIZER)
  deleteReasonReturnCase(@Param('id') id: number) {
    return this.reasonReturnCaseService.deleteReasonReturnCase(id);
  }
}
