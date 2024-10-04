import { Controller } from '@nestjs/common';
import { ClinicalResearchCaseReportValidateService } from '../services/clinical-research-case-report-validate.service';

@Controller('clinical-research-case-report-validate')
export class ClinicalResearchCaseReportValidateController {
  constructor(
    private readonly clinicalResearchCaseReportValidateService: ClinicalResearchCaseReportValidateService,
  ) {}
}
