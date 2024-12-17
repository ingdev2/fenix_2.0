import { Controller, Get, Post, Body, Param, Ip } from '@nestjs/common';
import { CaseReportOriginalService } from '../services/case-report-original.service';
import { CreateReportOriDto } from '../utils/helpers/ori-dto-validator.helper';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/modules/auth/decorators/auth.decorator';
import { RolesEnum } from 'src/utils/enums/roles.enum';

@ApiTags('case-report-original')
@ApiBearerAuth()
@Controller('case-report-original')
export class CaseReportOriginalController {
  constructor(
    private readonly CaseReportOriginalService: CaseReportOriginalService,
  ) {}

  @Post('/createReportOriginal')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  async createReportOriginal(
    @Body() createReportOriDto: CreateReportOriDto,
    @Ip() clientIp: string,
  ) {
    return await this.CaseReportOriginalService.createReportOriginal(
      createReportOriDto,
      clientIp,
    );
  }

  @Get('/listReportsOriginal')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  async listReportsOriginal() {
    return await this.CaseReportOriginalService.findAllReportsOriginal();
  }

  @Get('/findReportOriginal/:id')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  async findReportOriginal(@Param('id') id: string) {
    return await this.CaseReportOriginalService.findOneReportOriginal(id);
  }
}
