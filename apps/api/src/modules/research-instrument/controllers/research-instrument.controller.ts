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
import { ResearchInstrumentService } from '../services/research-instrument.service';
import { CreateResearchInstrumentDto } from '../dto/create-research-instrument.dto';
import { UpdateResearchInstrumentDto } from '../dto/update-research-instrument.dto';
import { ApiTags } from '@nestjs/swagger';
import { PermissionGuard } from 'src/utils/guards/permission.guard';
import { Permission } from 'src/utils/decorators/permission.decorator';
import { PermissionsEnum } from 'src/utils/enums/permissions.enum';

@ApiTags('research-instrument')
@Controller('research-instrument')
@UseGuards(PermissionGuard)
export class ResearchInstrumentController {
  constructor(
    private readonly researchInstrumentService: ResearchInstrumentService,
  ) {}

  @Post('/createResearchInstrument/:userIdPermission')
  @Permission(PermissionsEnum.SUPER_ADMIN, PermissionsEnum.PARAMETERIZER)
  createResearchInstrument(
    @Body() createResearchInstrumentDto: CreateResearchInstrumentDto,
  ) {
    return this.researchInstrumentService.createResearchInstrument(
      createResearchInstrumentDto,
    );
  }

  @Get('/listResearchInstruments/')
  listResearchInstruments() {
    return this.researchInstrumentService.findAllResearchInstruments();
  }

  @Get('/findResearchInstrument/:id')
  findResearchInstrument(@Param('id') id: number) {
    return this.researchInstrumentService.findOneResearchInstrument(id);
  }

  @Patch('/updateResearchInstrument/:id/:userIdPermission')
  @Permission(PermissionsEnum.SUPER_ADMIN, PermissionsEnum.PARAMETERIZER)
  updateResearchInstrument(
    @Param('id') id: number,
    @Body() updateResearchInstrumentDto: UpdateResearchInstrumentDto,
  ) {
    return this.researchInstrumentService.updateResearchInstrument(
      id,
      updateResearchInstrumentDto,
    );
  }

  @Delete('/deleteResearchInstrument/:id/:userIdPermission')
  @Permission(PermissionsEnum.SUPER_ADMIN, PermissionsEnum.PARAMETERIZER)
  deleteResearchInstrument(@Param('id') id: number) {
    return this.researchInstrumentService.deleteResearchInstrument(id);
  }
}
