import { Module } from '@nestjs/common';
import { ClinicalResearchInfluencingFactorService } from './services/clinical-research-influencing-factor.service';
import { ClinicalResearchInfluencingFactorController } from './controllers/clinical-research-influencing-factor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClinicalResearchInfluencingFactor } from './entities/clinical-research-influencing-factor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClinicalResearchInfluencingFactor])],
  controllers: [ClinicalResearchInfluencingFactorController],
  providers: [ClinicalResearchInfluencingFactorService],
  exports: [ClinicalResearchInfluencingFactorService],
})
export class ClinicalResearchInfluencingFactorModule {}
