import { Controller } from '@nestjs/common';
import { ClinicalResearchInfluencingFactorService } from '../services/clinical-research-influencing-factor.service';

@Controller('clinical-research-influencing-factor')
export class ClinicalResearchInfluencingFactorController {
  constructor(
    private readonly clinicalResearchInfluencingFactorService: ClinicalResearchInfluencingFactorService,
  ) {}
}
