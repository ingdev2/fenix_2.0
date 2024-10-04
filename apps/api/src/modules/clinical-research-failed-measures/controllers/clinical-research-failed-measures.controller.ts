import { Controller } from '@nestjs/common';
import { ClinicalResearchFailedMeasuresService } from '../services/clinical-research-failed-measures.service';

@Controller('clinical-research-failed-measures')
export class ClinicalResearchFailedMeasuresController {
  constructor(
    private readonly clinicalResearchFailedMeasuresService: ClinicalResearchFailedMeasuresService,
  ) {}
}
