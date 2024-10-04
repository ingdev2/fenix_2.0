import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { FilterReportResearcherAssignmentDto } from '../dto/filter-researcher-.dto';
import { HttpResearchersService } from '../http/http-researchers.service';
import { CreateReportResearcherAssignmentDto } from '../dto/create-report-researcher-assignment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ReportResearcherAssignment } from '../entities/report-researchers-assignment.entity';
import { Repository } from 'typeorm';
import { CaseReportValidateService } from 'src/modules/case-report-validate/services/case-report-validate.service';
import { LogService } from 'src/modules/log/services/log.service';
import { LogReportsEnum } from 'src/utils/enums/logs.enum';
import { MovementReport } from 'src/modules/movement-report/entities/movement-report.entity';
import { MovementReportEnum } from 'src/utils/enums/movement-report.enum';
import { CaseReportValidate } from 'src/modules/case-report-validate/entities/case-report-validate.entity';
import { CaseType } from 'src/modules/case-type/entities/case-type.entity';
import { CaseTypeReportEnum } from 'src/utils/enums/caseType-report.enum';
import { SeverityClasification } from 'src/modules/severity-clasification/entities/severity-clasification.entity';
import { SeverityClasificationEnum } from 'src/utils/enums/severity-clasif.enum';
import { RolePermission } from 'src/modules/role-permission/entities/role-permission.entity';
import { UserRoles } from 'src/utils/enums/user-roles.enum';
import { RoleResponseTime } from 'src/modules/role-response-time/entities/role-response-time.entity';
import { SentinelTimeEnum } from 'src/utils/enums/sentinel-time.enum';
import { UpdateReportResearcherAssignmentDto } from '../dto/update-report-researcher-assignment.dto';
import { ReportAnalystAssignment } from 'src/modules/report-analyst-assignment/entities/report-analyst-assignment.entity';

@Injectable()
export class ResearchersService {
  constructor(
    @InjectRepository(ReportResearcherAssignment)
    private readonly researcherRepository: Repository<ReportResearcherAssignment>,
    @InjectRepository(CaseReportValidate)
    private readonly caseReportValidateRepository: Repository<CaseReportValidate>,
    @InjectRepository(CaseType)
    private readonly caseTypeRepository: Repository<CaseType>,
    @InjectRepository(SeverityClasification)
    private readonly severityClasificationRepository: Repository<SeverityClasification>,
    @InjectRepository(RolePermission)
    private readonly roleRepository: Repository<RolePermission>,
    @InjectRepository(RoleResponseTime)
    private readonly roleResponseTimeRepository: Repository<RoleResponseTime>,
    @InjectRepository(ReportAnalystAssignment)
    private readonly reportAnalystAssignmentRepository: Repository<ReportAnalystAssignment>,
    @InjectRepository(MovementReport)
    private readonly movementReportRepository: Repository<MovementReport>,

    private readonly httpResearchersService: HttpResearchersService,
    private readonly logService: LogService,
    @Inject(forwardRef(() => CaseReportValidateService))
    private readonly caseReportValidateService: CaseReportValidateService,
  ) {}

  async filterResearchers(
    resFilter: Partial<FilterReportResearcherAssignmentDto>,
  ) {
    const result = await this.httpResearchersService.getResearchersData();
    const researchers: FilterReportResearcherAssignmentDto[] = result.data.data;

    const filteredResearchers = researchers.filter((research) => {
      return (
        (!resFilter.empImmediateBoss ||
          research.empImmediateBoss === resFilter.empImmediateBoss) &&
        (!resFilter.empPosition ||
          research.empPosition === resFilter.empPosition)
      );
    });

    if (filteredResearchers.length === 0) {
      throw new HttpException(
        'No se encontraron investigadores que coincidan con los criterios de búsqueda.',
        HttpStatus.NOT_FOUND,
      );
    }

    return filteredResearchers;
  }

  async assingResearcher(
    createResearcherDto: CreateReportResearcherAssignmentDto,
    clientIp: string,
    idAnalyst: string,
  ) {
    if (
      !createResearcherDto ||
      !createResearcherDto.res_userresearch_id ||
      !createResearcherDto.res_validatedcase_id_fk
    ) {
      throw new HttpException(
        'Algunos datos para asignar investigador son requeridos.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!clientIp) {
      throw new HttpException(
        'La dirección IP del usuario es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!idAnalyst) {
      throw new HttpException(
        'El identificador del analista es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const reportAssignmentFind = await this.researcherRepository.findOne({
      where: {
        res_validatedcase_id_fk: createResearcherDto.res_validatedcase_id_fk,
        res_status: true,
        res_isreturned: false,
      },
    });

    if (reportAssignmentFind) {
      throw new HttpException(
        'El reporte ya tiene un investigador asignado',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const findCaseValidate =
      await this.caseReportValidateService.findOneReportValidate(
        createResearcherDto.res_validatedcase_id_fk,
      );

    const findCaseType = await this.caseTypeRepository.findOne({
      where: {
        cas_t_name: CaseTypeReportEnum.ADVERSE_EVENT,
        cas_t_status: true,
      },
    });

    if (!findCaseType) {
      throw new HttpException(
        `El tipo de caso ${CaseTypeReportEnum.ADVERSE_EVENT} no existe.`,
        HttpStatus.NOT_FOUND,
      );
    }

    const findSeverityClasification =
      await this.severityClasificationRepository.findOne({
        where: {
          sev_c_name: SeverityClasificationEnum.SERIOUS_SEVERITY,
          sev_c_status: true,
        },
      });

    if (!findSeverityClasification) {
      throw new HttpException(
        `La clasificacion de severidad ${SeverityClasificationEnum.SERIOUS_SEVERITY} no existe.`,
        HttpStatus.NOT_FOUND,
      );
    }

    const findIdRole = await this.roleRepository.findOne({
      where: {
        role_name: UserRoles.INVESTIGATOR,
        role_status: true,
      },
    });

    if (!findIdRole) {
      throw new HttpException(
        `El rol ${UserRoles.INVESTIGATOR} no existe.`,
        HttpStatus.NOT_FOUND,
      );
    }

    const findRoleResponseTime = await this.roleResponseTimeRepository.findOne({
      where: {
        rest_r_role_id_fk: findIdRole.id,
        rest_r_severityclasif_id_fk:
          findCaseValidate.val_cr_severityclasif_id_fk,
        rest_r_status: true,
      },
    });

    if (!findRoleResponseTime) {
      throw new HttpException(
        `El tiempo de respuesta del rol ${UserRoles.INVESTIGATOR} no existe.`,
        HttpStatus.NOT_FOUND,
      );
    }

    const movementReportFound = await this.movementReportRepository.findOne({
      where: {
        mov_r_name: MovementReportEnum.ASSIGNMENT_RESEARCHER,
        mov_r_status: true,
      },
    });

    if (!movementReportFound) {
      return new HttpException(
        `El movimiento no existe.`,
        HttpStatus.NOT_FOUND,
      );
    }

    const updateStatusMovement = await this.caseReportValidateRepository.update(
      createResearcherDto.res_validatedcase_id_fk,
      {
        val_cr_statusmovement_id_fk: movementReportFound.id,
      },
    );

    if (updateStatusMovement.affected === 0) {
      throw new HttpException(
        `No se pudo actualizar el moviemiento del reporte.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    let responseTime = findRoleResponseTime.rest_r_responsetime;

    if (
      findCaseType.id === findCaseValidate.val_cr_casetype_id_fk &&
      findSeverityClasification.id ===
        findCaseValidate.val_cr_severityclasif_id_fk
    ) {
      responseTime = SentinelTimeEnum.SENTINEL_TIME;
    }

    const research = this.researcherRepository.create({
      ...createResearcherDto,
      res_useranalyst_id: idAnalyst,
      res_days: responseTime,
    });

    const assigned = await this.researcherRepository.save(research);

    await this.logService.createLog(
      assigned.res_validatedcase_id_fk,
      idAnalyst,
      clientIp,
      LogReportsEnum.LOG_ASSIGNMENT_RESEARCHER,
    );

    return new HttpException(
      `¡El investigador se asignó correctamente!`,
      HttpStatus.CREATED,
    );
  }

  async summaryReportsMyAssignedCases(
    filingNumber?: string,
    patientDoc?: string,
    caseTypeId?: number,
    eventId?: number,
    priorityId?: number,
  ) {
    const query = this.caseReportValidateRepository
      .createQueryBuilder('crv')
      .innerJoinAndSelect('crv.reportResearcherAssignment', 'res')
      .leftJoinAndSelect('crv.caseType', 'caseType')
      .leftJoinAndSelect('crv.event', 'event')
      .leftJoinAndSelect('crv.priority', 'priority')
      .leftJoinAndSelect(
        'crv.reportAnalystAssignment',
        'reportAnalystAssignment',
      )
      .leftJoinAndSelect(
        'crv.clinicalResearchCaseReportValidate',
        'clinicalResearchCaseReportValidate',
      )
      .where('crv.val_cr_validated = :validated', { validated: false })
      .andWhere('crv.val_cr_status = :status', { status: true });

    if (filingNumber) {
      query.andWhere('crv.val_cr_filingnumber LIKE :filingNumber', {
        filingNumber: `%${filingNumber}%`,
      });
    }

    if (patientDoc) {
      query.andWhere('crv.val_cr_documentpatient LIKE :patientDoc', {
        patientDoc: `%${patientDoc}%`,
      });
    }

    if (caseTypeId) {
      query.andWhere('crv.val_cr_casetype_id_fk = :caseTypeId', { caseTypeId });
    }

    if (eventId) {
      query.andWhere('crv.val_cr_event_id_fk = :eventId', { eventId });
    }

    if (priorityId) {
      query.andWhere('crv.val_cr_priority_id_fk = :priorityId', { priorityId });
    }

    query.andWhere('res.res_status = :statusBool', {
      statusBool: true,
    });

    query.andWhere('res.res_isreturned = :isReturnedBool', {
      isReturnedBool: false,
    });

    const caseReportsValidate = await query
      .orderBy('res.createdAt', 'DESC')
      .getMany();

    if (caseReportsValidate.length === 0) {
      throw new HttpException(
        'No hay reportes para mostrar.',
        HttpStatus.NOT_FOUND,
      );
    }

    return caseReportsValidate;
  }

  async summaryReportsMyCasesByCharacterization(
    filingNumber?: string,
    statusMovementId?: number,
    caseTypeId?: number,
    eventId?: number,
    priorityId?: number,
  ) {
    const query = this.caseReportValidateRepository
      .createQueryBuilder('crv')
      .innerJoinAndSelect('crv.reportResearcherAssignment', 'res')
      .leftJoinAndSelect('crv.caseType', 'caseType')
      .leftJoinAndSelect('crv.event', 'event')
      .leftJoinAndSelect('crv.priority', 'priority')
      .leftJoinAndSelect(
        'crv.reportAnalystAssignment',
        'reportAnalystAssignment',
      )
      .where('crv.val_cr_validated = :validated', { validated: false })
      .andWhere('crv.val_cr_status = :status', { status: true });

    if (filingNumber) {
      query.andWhere('crv.val_cr_filingnumber LIKE :filingNumber', {
        filingNumber: `%${filingNumber}%`,
      });
    }

    if (statusMovementId) {
      query.andWhere('crv.val_cr_statusmovement_id_fk = :statusMovementId', {
        statusMovementId,
      });
    }

    if (caseTypeId) {
      query.andWhere('crv.val_cr_casetype_id_fk = :caseTypeId', { caseTypeId });
    }

    if (eventId) {
      query.andWhere('crv.val_cr_event_id_fk = :eventId', { eventId });
    }

    if (priorityId) {
      query.andWhere('crv.val_cr_priority_id_fk = :priorityId', { priorityId });
    }

    query.andWhere('crv.val_cr_characterization_id_fk IS NOT NULL');

    query.andWhere('res.res_status = :statusBool', {
      statusBool: true,
    });

    query.andWhere('res.res_isreturned = :isReturnedBool', {
      isReturnedBool: false,
    });

    const caseReportsValidate = await query
      .orderBy('res.createdAt', 'DESC')
      .getMany();

    if (caseReportsValidate.length === 0) {
      throw new HttpException(
        'No hay reportes para mostrar.',
        HttpStatus.NOT_FOUND,
      );
    }

    return caseReportsValidate;
  }

  async findOneAssignedResearch(id: number) {
    if (!id) {
      throw new HttpException(
        'El identificador del investigador asignado es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const research = await this.researcherRepository.findOne({
      where: { id, res_status: true, res_isreturned: false },
    });

    if (!research) {
      throw new HttpException(
        'No se encontró el investigador',
        HttpStatus.NOT_FOUND,
      );
    }
    return research;
  }

  async reAssingResearcher(
    updateResearcherDto: UpdateReportResearcherAssignmentDto,
    clientIp: string,
    idAnalyst: string,
    idCaseReportValidate: string,
  ) {
    if (!updateResearcherDto) {
      throw new HttpException(
        'Los datos para actualizar la asignación del investigador son requeridos.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!clientIp) {
      throw new HttpException(
        'La dirección IP del usuario es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!idAnalyst) {
      throw new HttpException(
        'El identificador del analista es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!idCaseReportValidate) {
      throw new HttpException(
        'El identificador del caso es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const findResearcherAssigned = await this.researcherRepository.findOne({
      where: {
        res_validatedcase_id_fk: idCaseReportValidate,
        res_status: true,
        // res_isreturned: false,
      },
      withDeleted: true,
    });

    if (!findResearcherAssigned) {
      throw new HttpException(
        'No se encontró el reporte asignado a investigador.',
        HttpStatus.NOT_FOUND,
      );
    }

    const caseReportValidate = await this.caseReportValidateRepository.findOne({
      where: {
        id: idCaseReportValidate,
        val_cr_validated: false,
        val_cr_status: true,
      },
      withDeleted: true,
    });

    if (!caseReportValidate) {
      throw new HttpException(
        'No se encontró el reporte.',
        HttpStatus.NOT_FOUND,
      );
    }

    const movementReportFound = await this.movementReportRepository.findOne({
      where: {
        mov_r_name: MovementReportEnum.REASSIGNMENT_RESEARCHER,
        mov_r_status: true,
      },
    });

    if (!movementReportFound) {
      return new HttpException(
        `El movimiento no existe.`,
        HttpStatus.NOT_FOUND,
      );
    }

    const updateStatusMovement = await this.caseReportValidateRepository.update(
      caseReportValidate.id,
      {
        val_cr_statusmovement_id_fk: movementReportFound.id,
        val_cr_status: true,
        deletedAt: null,
      },
    );

    if (updateStatusMovement.affected === 0) {
      throw new HttpException(
        `No se pudo actualizar el moviemiento del reporte.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const result = await this.researcherRepository.update(
      findResearcherAssigned.id,
      {
        ...updateResearcherDto,
        res_useranalyst_id: idAnalyst,
        deletedAt: null,
        res_isreturned: false,
      },
    );

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo reasignar el analista`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    await this.logService.createLog(
      idCaseReportValidate,
      idAnalyst,
      clientIp,
      LogReportsEnum.LOG_REASSIGNMENT_RESEARCHER,
    );

    return new HttpException(
      `Investigador reasignado correctamente!`,
      HttpStatus.OK,
    );
  }

  async returnCaseToAnalyst(
    idCaseReportValidate: string,
    clientIp: string,
    idResearcher: string,
  ) {
    if (!idCaseReportValidate) {
      throw new HttpException(
        'El identificador del caso es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!clientIp) {
      throw new HttpException(
        'La dirección IP del usuario es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!idResearcher) {
      throw new HttpException(
        'El identificador del investigador es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const findReportResearcherAssigned =
      await this.researcherRepository.findOne({
        where: {
          res_validatedcase_id_fk: idCaseReportValidate,
          res_status: true,
          res_isreturned: false,
        },
      });

    if (!findReportResearcherAssigned) {
      throw new HttpException(
        'No se encontró el reporte asignado a investigador.',
        HttpStatus.NOT_FOUND,
      );
    }

    const reportAssignmentFind =
      await this.reportAnalystAssignmentRepository.findOne({
        where: {
          ana_validatedcase_id_fk: idCaseReportValidate,
          ana_status: true,
          ana_isreturned: false,
        },
      });

    if (!reportAssignmentFind) {
      throw new HttpException(
        'No se encontró el reporte asignado a analista',
        HttpStatus.NOT_FOUND,
      );
    }

    await this.caseReportValidateService.findOneReportValidate(
      idCaseReportValidate,
    );

    const updateStatusReturn = await this.researcherRepository.update(
      findReportResearcherAssigned.id,
      {
        res_isreturned: true,
      },
    );

    if (updateStatusReturn.affected === 0) {
      throw new HttpException(
        `No se pudo actualizar el estado de retorno.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const result = await this.researcherRepository.softDelete(
      findReportResearcherAssigned.id,
    );

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo anular el registro.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const movementReportFound = await this.movementReportRepository.findOne({
      where: {
        mov_r_name: MovementReportEnum.RETURN_CASE_ANALYST,
        mov_r_status: true,
      },
    });

    if (!movementReportFound) {
      return new HttpException(
        `El movimiento no existe.`,
        HttpStatus.NOT_FOUND,
      );
    }

    const updateStatusMovement = await this.caseReportValidateRepository.update(
      idCaseReportValidate,
      {
        val_cr_statusmovement_id_fk: movementReportFound.id,
      },
    );

    if (updateStatusMovement.affected === 0) {
      throw new HttpException(
        `No se pudo actualizar el moviemiento del reporte.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    await this.logService.createLog(
      idCaseReportValidate,
      idResearcher,
      clientIp,
      LogReportsEnum.LOG_RETURN_CASE_ANALYST,
    );

    return new HttpException(
      `¡Reporte devuelto a analista correctamente!`,
      HttpStatus.OK,
    );
  }

  async deleteAssignedResearcher(id: number) {
    const ResearcherFound =
      await this.reportAnalystAssignmentRepository.findOneBy({ id });

    if (!ResearcherFound) {
      return new HttpException(
        `Investigador no encontrado, favor recargar.`,
        HttpStatus.NOT_FOUND,
      );
    }

    const result = await this.researcherRepository.softDelete(id);

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo eliminar el investigador`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(`¡Datos eliminados correctamente!`, HttpStatus.OK);
  }
}
