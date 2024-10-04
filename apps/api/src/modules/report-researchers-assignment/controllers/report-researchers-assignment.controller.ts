import {
  Body,
  Controller,
  Delete,
  Get,
  Ip,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ResearchersService } from '../services/report-researchers-assignment.service';
import { FilterReportResearcherAssignmentDto } from '../dto/filter-researcher-.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateReportResearcherAssignmentDto } from '../dto/create-report-researcher-assignment.dto';
import { UpdateReportResearcherAssignmentDto } from '../dto/update-report-researcher-assignment.dto';
import { QueryReportResearchersAssignmentDto } from '../dto/query-report-researcher-assignment.dto';
import { PermissionGuard } from 'src/utils/guards/permission.guard';
import { Permission } from 'src/utils/decorators/permission.decorator';
import { PermissionsEnum } from 'src/utils/enums/permissions.enum';

@ApiTags('report-researchers-assignment')
@Controller('report-researchers-assignment')
@UseGuards(PermissionGuard)
export class ReportResearchersAssignmentController {
  constructor(private readonly researchersService: ResearchersService) {}

  @Get('filterResearchers/:userIdPermission')
  @Permission(PermissionsEnum.SUPER_ADMIN, PermissionsEnum.ANALYST)
  filterResearchers(@Query() query: QueryReportResearchersAssignmentDto) {
    const filter = new FilterReportResearcherAssignmentDto();
    filter.empImmediateBoss = query.empImmediateBoss;
    filter.empPosition = query.empPosition;

    return this.researchersService.filterResearchers(filter);
  }

  @Get('findAssignedResearch/:id')
  findAssignedResearch(@Param('id') id: number) {
    return this.researchersService.findOneAssignedResearch(id);
  }

  @Get('/summaryReportsMyAssignedCases/:userIdPermission')
  @Permission(PermissionsEnum.SUPER_ADMIN, PermissionsEnum.INVESTIGATOR)
  async summaryReportsMyAssignedCases(
    @Query() query: QueryReportResearchersAssignmentDto,
  ) {
    return await this.researchersService.summaryReportsMyAssignedCases(
      query.filingNumber,
      query.patientDoc,
      query.caseTypeId,
      query.eventId,
      query.priorityId,
    );
  }

  @Get('/summaryReportsMyCasesByCharacterization/:userIdPermission')
  @Permission(PermissionsEnum.SUPER_ADMIN, PermissionsEnum.INVESTIGATOR)
  async summaryReportsMyCasesByCharacterization(
    @Query() query: QueryReportResearchersAssignmentDto,
  ) {
    return await this.researchersService.summaryReportsMyCasesByCharacterization(
      query.filingNumber,
      query.statusMovementId,
      query.caseTypeId,
      query.eventId,
      query.priorityId,
    );
  }

  @Post('assingResearcher/:idAnalyst/:userIdPermission')
  @Permission(PermissionsEnum.SUPER_ADMIN, PermissionsEnum.ANALYST)
  createAssingResearcher(
    @Body() createResearcherDto: CreateReportResearcherAssignmentDto,
    @Ip() clientIp: string,
    @Param('idAnalyst') idAnalyst: string,
  ) {
    return this.researchersService.assingResearcher(
      createResearcherDto,
      clientIp,
      idAnalyst,
    );
  }

  @Patch('reAssignResearch/:idAnalyst/:idCaseReportValidate/:userIdPermission')
  @Permission(PermissionsEnum.SUPER_ADMIN, PermissionsEnum.ANALYST)
  updateReAssignedResearch(
    @Body() updateResearcherDto: UpdateReportResearcherAssignmentDto,
    @Ip() clientIp: string,
    @Param('idAnalyst') idAnalyst: string,
    @Param('idCaseReportValidate') idCaseReportValidate: string,
  ) {
    return this.researchersService.reAssingResearcher(
      updateResearcherDto,
      clientIp,
      idAnalyst,
      idCaseReportValidate,
    );
  }

  @Patch(
    'returnCaseToAnalyst/:idResearcher/:idCaseReportValidate/:userIdPermission',
  )
  @Permission(PermissionsEnum.SUPER_ADMIN, PermissionsEnum.INVESTIGATOR)
  updateReturnCaseToAnalyst(
    @Param('idResearcher') idResearcher: string,
    @Param('idCaseReportValidate') idCaseReportValidate: string,
    @Ip() clientIp: string,
  ) {
    return this.researchersService.returnCaseToAnalyst(
      idCaseReportValidate,
      clientIp,
      idResearcher,
    );
  }

  @Delete('deleteAssignedResearch/:id/:userIdPermission')
  @Permission(PermissionsEnum.SUPER_ADMIN, PermissionsEnum.ANALYST)
  deleteAssignedResearch(@Param('id') id: number) {
    return this.researchersService.deleteAssignedResearcher(id);
  }
}
