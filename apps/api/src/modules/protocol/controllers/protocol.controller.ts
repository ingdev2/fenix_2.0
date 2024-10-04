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
import { ProtocolService } from '../services/protocol.service';
import { CreateProtocolDto } from '../dto/create-protocol.dto';
import { UpdateProtocolDto } from '../dto/update-protocol.dto';
import { ApiTags } from '@nestjs/swagger';
import { PermissionGuard } from 'src/utils/guards/permission.guard';
import { Permission } from 'src/utils/decorators/permission.decorator';
import { PermissionsEnum } from 'src/utils/enums/permissions.enum';

@ApiTags('protocol')
@Controller('protocol')
@UseGuards(PermissionGuard)
export class ProtocolController {
  constructor(private readonly protocolService: ProtocolService) {}

  @Post('/createProtocol/:userIdPermission')
  @Permission(PermissionsEnum.SUPER_ADMIN, PermissionsEnum.PARAMETERIZER)
  createProtocol(@Body() createProtocolDto: CreateProtocolDto) {
    return this.protocolService.createProtocol(createProtocolDto);
  }

  @Get('/listProtocols')
  listProtocols() {
    return this.protocolService.findAllProtocols();
  }

  @Get('/findProtocol/:id')
  findProtocol(@Param('id') id: number) {
    return this.protocolService.findOneProtocol(id);
  }

  @Patch('/updateProtocol/:id/:userIdPermission')
  @Permission(PermissionsEnum.SUPER_ADMIN, PermissionsEnum.PARAMETERIZER)
  updateProtocol(
    @Param('id') id: number,
    @Body() updateProtocolDto: UpdateProtocolDto,
  ) {
    return this.protocolService.updateProtocol(id, updateProtocolDto);
  }

  @Delete('/deleteProtocol/:id/:userIdPermission')
  @Permission(PermissionsEnum.SUPER_ADMIN, PermissionsEnum.PARAMETERIZER)
  deleteProtocol(@Param('id') id: number) {
    return this.protocolService.deleteProtocol(id);
  }
}
