import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PositionService } from '../services/position.service';
import { CreatePositionDto } from '../dto/create-position.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdatePositionDto } from '../dto/update-position.dto';
import { RolesEnum } from 'src/utils/enums/roles.enum';
import { Auth } from 'src/modules/auth/decorators/auth.decorator';

@ApiTags('position')
@Controller('position')
@ApiBearerAuth()
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  @Post('/createPosition/:userIdPermission')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  createPosition(@Body() createPositionDto: CreatePositionDto) {
    return this.positionService.createPosition(createPositionDto);
  }

  @Post('/synchronizePositions')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  syncronizePositions() {
    return this.positionService.synchronizePositions();
  }

  @Get('/listPositions')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  listPositions() {
    return this.positionService.findAllPosition();
  }

  @Get('/findPosition/:id')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  findPosition(@Param('id') id: number) {
    return this.positionService.findOnePosition(id);
  }

  @Patch('/updatePosition/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  updatePosition(
    @Param('id') id: number,
    @Body() updatePositionDto: UpdatePositionDto,
  ) {
    return this.positionService.updatePosition(id, updatePositionDto);
  }

  @Delete('/deletePosition/:id/')
  @Auth(RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.COLLABORATOR)
  async deletePosition(@Param('id') id: number) {
    return await this.positionService.deletePosition(id);
  }
}
