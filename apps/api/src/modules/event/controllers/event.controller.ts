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
import { EventService } from '../services/event.service';
import { CreateEventDto } from '../dto/create-event.dto';
import { UpdateEventDto } from '../dto/update-event.dto';
import { ApiTags } from '@nestjs/swagger';
import { PermissionGuard } from 'src/utils/guards/permission.guard';
import { Permission } from 'src/utils/decorators/permission.decorator';
import { PermissionsEnum } from 'src/utils/enums/permissions.enum';

@ApiTags('event')
@Controller('event')
@UseGuards(PermissionGuard)
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post('/createEvent/:userIdPermission')
  @Permission(PermissionsEnum.SUPER_ADMIN, PermissionsEnum.PARAMETERIZER)
  createEvent(@Body() createEventDto: CreateEventDto) {
    return this.eventService.createEvent(createEventDto);
  }

  @Post('/createEventsArray')
  createEventsArray(@Body() createEventDto: CreateEventDto[]) {
    return this.eventService.createEventsArray(createEventDto);
  }

  @Get('/listEvents/')
  listEvents() {
    return this.eventService.findAllEvents();
  }

  @Get('/findEvent/:id/')
  findEvent(@Param('id') id: number) {
    return this.eventService.findOneEvent(id);
  }

  @Get('/findEventsByEventTypeIdAndUnitId/:eventTypeId/:unitId?/')
  findEventsByEventTypeIdAndUnitId(
    @Param('eventTypeId') eventTypeId: number,
    @Param('unitId') unitId?: string,
  ) {
    const unitIdNumber = unitId ? parseInt(unitId, 10) : undefined;
    return this.eventService.findEventByEventTypeAndIdUnitId(
      eventTypeId,
      unitIdNumber,
    );
  }

  @Get('/findEventsByEventTypeId/:eventTypeId/')
  findEventsByEventTypeId(@Param('eventTypeId') eventTypeId: number) {
    return this.eventService.findEventByEventTypeId(eventTypeId);
  }

  @Patch('/updateEvent/:id/:userIdPermission')
  @Permission(PermissionsEnum.SUPER_ADMIN, PermissionsEnum.PARAMETERIZER)
  updateEvent(@Param('id') id: number, @Body() updateEventDto: UpdateEventDto) {
    return this.eventService.updateEvent(id, updateEventDto);
  }

  @Delete('/deleteEvent/:id/:userIdPermission')
  @Permission(PermissionsEnum.SUPER_ADMIN, PermissionsEnum.PARAMETERIZER)
  deleteEvent(@Param('id') id: number) {
    return this.eventService.deleteEvent(id);
  }
}
