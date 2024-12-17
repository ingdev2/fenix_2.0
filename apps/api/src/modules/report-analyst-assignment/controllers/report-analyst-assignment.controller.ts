import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Ip,
  Query,
  Patch,
} from '@nestjs/common';
import { ReportAnalystAssignmentService } from '../services/report-analyst-assignment.service';
import { CreateReportAnalystAssignmentDto } from '../dto/create-report-analyst-assignment.dto';
import { UpdateReportAnalystAssignmentDto } from '../dto/update-report-analyst-assignment.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesEnum } from 'src/utils/enums/roles.enum';
import { Auth } from 'src/modules/auth/decorators/auth.decorator';

@ApiTags('report-analyst-assignment')
@Controller('report-analyst-assignment')
@ApiBearerAuth()
export class ReportAnalystAssignmentController {
  constructor(
    private readonly reportAnalisysAssignmentService: ReportAnalystAssignmentService,
  ) {}

  @Post('assignAnalyst/:idValidator/:idNumberAnalist/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  assignAnalyst(
    @Body() createAnalystReporterDto: CreateReportAnalystAssignmentDto,
    @Ip() clientIp: string,
    @Param('idValidator') idValidator: string,
    @Param('idNumberAnalist') idNumberAnalist: string,
  ) {
    return this.reportAnalisysAssignmentService.assignAnalyst(
      createAnalystReporterDto,
      clientIp,
      idValidator,
      idNumberAnalist,
    );
  }

  @Post('returnCaseBetweenAnalyst/:idAnalystCurrent/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  createReturnCaseBetweenAnalyst(
    @Body() createAnalystReporterDto: CreateReportAnalystAssignmentDto,
    @Ip() clientIp: string,
    @Param('idAnalystCurrent') idAnalystCurrent: string,
  ) {
    return this.reportAnalisysAssignmentService.returnCaseBetweenAnalyst(
      createAnalystReporterDto,
      clientIp,
      idAnalystCurrent,
    );
  }

  @Get('findAssignedAnalyst/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  findAssignedAnalyst(@Param('id') id: number) {
    return this.reportAnalisysAssignmentService.findOneAssignedAnalyst(id);
  }

  @Get('findInfoAnalystByCode/:code/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  findInfoAnalystByCode(@Param('code') code?: number) {
    return this.reportAnalisysAssignmentService.findInfoAnalystByCode(code);
  }

  @Get('/summaryReportsForAssignCases/:idAnalyst/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  async summaryReportsForAssignCases(@Param('idAnalyst') idAnalyst: string) {
    return await this.reportAnalisysAssignmentService.summaryReportsForAssignCases(
      idAnalyst,
    );
  }

  @Patch('reAssignedAnalyst/:idValidator/:idCaseReportValidate/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  updateReAssignedAnalyst(
    @Body() updateReportAnalystAssignmentDto: UpdateReportAnalystAssignmentDto,
    @Ip() clientIp: string,
    @Param('idValidator') idValidator: string,
    @Param('idCaseReportValidate') idCaseReportValidate: string,
  ) {
    return this.reportAnalisysAssignmentService.reAssingAnalyst(
      updateReportAnalystAssignmentDto,
      clientIp,
      idValidator,
      idCaseReportValidate,
    );
  }

  @Patch('returnCaseToValidator/:idAnalyst/:idCaseReportValidate/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  updateReturnCaseToValidator(
    @Param('idCaseReportValidate') idCaseReportValidate: string,
    @Ip() clientIp: string,
    @Param('idAnalyst') idAnalyst: string,
  ) {
    return this.reportAnalisysAssignmentService.returnCaseToValidator(
      idCaseReportValidate,
      clientIp,
      idAnalyst,
    );
  }

  @Delete('deleteAssignedAnalyst/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  deleteAssignedAnalyst(@Param('id') id: number) {
    return this.reportAnalisysAssignmentService.deleteAssignedAnalyst(id);
  }
}
