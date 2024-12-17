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
} from '@nestjs/common';
import { ResearchersService } from '../services/report-researchers-assignment.service';
import { FilterReportResearcherAssignmentDto } from '../dto/filter-researcher-.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateReportResearcherAssignmentDto } from '../dto/create-report-researcher-assignment.dto';
import { UpdateReportResearcherAssignmentDto } from '../dto/update-report-researcher-assignment.dto';
import { QueryReportResearchersAssignmentDto } from '../dto/query-report-researcher-assignment.dto';
import { RolesEnum } from 'src/utils/enums/roles.enum';
import { Auth } from 'src/modules/auth/decorators/auth.decorator';

@ApiTags('report-researchers-assignment')
@Controller('report-researchers-assignment')
@ApiBearerAuth()
export class ReportResearchersAssignmentController {
  constructor(private readonly researchersService: ResearchersService) {}

  @Get('filterResearchers/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  filterResearchers(@Query() query: QueryReportResearchersAssignmentDto) {
    const filter = new FilterReportResearcherAssignmentDto();
    filter.empImmediateBoss = query.empImmediateBoss;
    filter.empPosition = query.empPosition;

    return this.researchersService.filterResearchers(filter);
  }

  @Get('findAssignedResearch/:id')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  findAssignedResearch(@Param('id') id: number) {
    return this.researchersService.findOneAssignedResearch(id);
  }

  @Get('/summaryReportsMyAssignedCases/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
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

  @Get('/summaryReportsMyCasesByCharacterization/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
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

  @Post('assingResearcher/:idAnalyst/:idNumberResearcher')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  createAssingResearcher(
    @Body() createResearcherDto: CreateReportResearcherAssignmentDto,
    @Ip() clientIp: string,
    @Param('idAnalyst') idAnalyst: string,
    @Param('idNumberResearcher') idNumberResearcher: string,
  ) {
    return this.researchersService.assingResearcher(
      createResearcherDto,
      clientIp,
      idAnalyst,
      idNumberResearcher,
    );
  }

  @Patch('reAssignResearch/:idAnalyst/:idCaseReportValidate/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
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

  @Patch('returnCaseToAnalyst/:idResearcher/:idCaseReportValidate/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
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

  @Delete('deleteAssignedResearch/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  deleteAssignedResearch(@Param('id') id: number) {
    return this.researchersService.deleteAssignedResearcher(id);
  }
}
