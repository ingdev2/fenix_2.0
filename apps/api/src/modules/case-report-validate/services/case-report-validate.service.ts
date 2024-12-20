import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import {
  Between,
  DataSource,
  FindOptionsWhere,
  In,
  Like,
  QueryRunner,
  Repository,
} from 'typeorm';

import { CaseReportValidate } from '../entities/case-report-validate.entity';
import { MovementReport } from 'src/modules/movement-report/entities/movement-report.entity';
import { CaseType } from 'src/modules/case-type/entities/case-type.entity';
import { ReportAnalystAssignment } from 'src/modules/report-analyst-assignment/entities/report-analyst-assignment.entity';
import { Synergy } from 'src/modules/synergy/entities/synergy.entity';
import { ReportResearcherAssignment } from 'src/modules/report-researchers-assignment/entities/report-researchers-assignment.entity';
import { Priority } from 'src/modules/priority/entities/priority.entity';
import { ObservationReturnCase } from 'src/modules/observation-return-case/entities/observation-return-case.entity';

import { MedicineService } from 'src/modules/medicine-case-report/services/medicine.service';
import { DeviceService } from 'src/modules/device-case-report/services/device.service';
import { LogService } from 'src/modules/log/services/log.service';
import { ReportAnalystAssignmentService } from 'src/modules/report-analyst-assignment/services/report-analyst-assignment.service';
import { SynergyService } from 'src/modules/synergy/services/synergy.service';
import { ResearchersService } from 'src/modules/report-researchers-assignment/services/report-researchers-assignment.service';
import { CharacterizationCasesService } from 'src/modules/characterization-cases/services/characterization-cases.service';
import { RiskTypeService } from 'src/modules/risk-type/services/risk-type.service';
import { EventTypeService } from 'src/modules/event-type/services/event-type.service';
import { ServiceService } from 'src/modules/service/services/service.service';
import { EventService } from 'src/modules/event/services/event.service';
import { SeverityClasificationService } from 'src/modules/severity-clasification/services/severity-clasification.service';
import { OriginService } from 'src/modules/origin/services/origin.service';
import { SubOriginService } from 'src/modules/sub-origin/services/sub-origin.service';
import { RiskLevelService } from 'src/modules/risk-level/services/risk-level.service';
import { ObservationReturnCaseService } from 'src/modules/observation-return-case/services/observation-return-case.service';

import { ValDtoValidator } from '../helper/val-dto-validator.helper';

import { MovementReportEnum } from 'src/utils/enums/movement-report.enum';
import { LogReportsEnum } from 'src/utils/enums/logs.enum';
import { CaseTypeReportEnum } from 'src/utils/enums/caseType-report.enum';

import { CreateCaseReportOriginalDto } from 'src/modules/case-report-original/dto/create-case-report-original.dto';
import { FindSimilarCaseReportValidateDto } from '../dto/find-similar-case-report-validate';
import { CreateValRiskReportDto } from '../dto/create-val-risk-report.dto';
import { CreateValAdverseEventReportDto } from '../dto/create-val-adverse-event-report.dto';
import { CreateValIncidentReportDto } from '../dto/create-val-incident-report.dto';
import { CreateValIndicatingUnsafeCareReportDto } from '../dto/create-val-indicating-unsafe-care-report.dto';
import { CreateValComplicationsReportDto } from '../dto/create-val-complications-report.dto';

@Injectable()
export class CaseReportValidateService {
  constructor(
    @InjectRepository(CaseReportValidate)
    private readonly caseReportValidateRepository: Repository<CaseReportValidate>,
    @InjectRepository(CaseType)
    private readonly caseTypeRepository: Repository<CaseType>,
    @InjectRepository(MovementReport)
    private readonly movementReportRepository: Repository<MovementReport>,
    @InjectRepository(ReportAnalystAssignment)
    private readonly reportAnalystAssignmentRepository: Repository<ReportAnalystAssignment>,
    @InjectRepository(Synergy)
    private readonly synergyRepository: Repository<Synergy>,
    @InjectRepository(ReportResearcherAssignment)
    private readonly researchRepository: Repository<ReportResearcherAssignment>,
    // @InjectRepository(PriorityEntity)
    // private readonly priorityRepository: Repository<PriorityEntity>,
    @InjectRepository(ObservationReturnCase)
    private readonly observationReturnCaseRepository: Repository<ObservationReturnCase>,

    private dataSource: DataSource,
    private readonly medicineService: MedicineService,
    private readonly deviceService: DeviceService,
    private readonly logService: LogService,
    private readonly synergyService: SynergyService,
    private readonly characterizationCasesService: CharacterizationCasesService,
    private readonly riskTypeService: RiskTypeService,
    private readonly eventTypeService: EventTypeService,
    private readonly eventService: EventService,
    private readonly serviceService: ServiceService,
    private readonly severityClasificationService: SeverityClasificationService,
    private readonly originService: OriginService,
    private readonly subOriginService: SubOriginService,
    private readonly riskLevelService: RiskLevelService,
    @Inject(forwardRef(() => ObservationReturnCaseService))
    private readonly observationReturnCaseService: ObservationReturnCaseService,
    @Inject(forwardRef(() => ResearchersService))
    private readonly researchService: ResearchersService,
    @Inject(forwardRef(() => ReportAnalystAssignmentService))
    private readonly reportAnalystAssignmentService: ReportAnalystAssignmentService,
  ) {}

  async findSimilarCaseReportsValidate(
    similarCaseReportValidate: FindSimilarCaseReportValidateDto,
  ) {
    if (
      !similarCaseReportValidate ||
      !similarCaseReportValidate.val_cr_casetype_id_fk ||
      !similarCaseReportValidate.val_cr_event_id_fk ||
      !similarCaseReportValidate.val_cr_eventtype_id_fk ||
      !similarCaseReportValidate.val_cr_reportingservice_id_fk
    ) {
      throw new HttpException(
        'Algunos datos del caso son requeridos.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const similarReport = await this.caseReportValidateRepository.find({
      where: {
        val_cr_doctypepatient: similarCaseReportValidate.val_cr_doctypepatient,
        val_cr_documentpatient:
          similarCaseReportValidate.val_cr_documentpatient,
        val_cr_casetype_id_fk: similarCaseReportValidate.val_cr_casetype_id_fk,
        val_cr_reportingservice_id_fk:
          similarCaseReportValidate.val_cr_reportingservice_id_fk,
        val_cr_event_id_fk: similarCaseReportValidate.val_cr_event_id_fk,
        val_cr_eventtype_id_fk:
          similarCaseReportValidate.val_cr_eventtype_id_fk,
        val_cr_status: true,
        val_cr_validated: false,
      },
      relations: {
        caseType: true,
        event: true,
        eventType: true,
        reportingService: true,
      },
      order: {
        createdAt: 'DESC',
      },
    });

    if (similarReport.length > 0) {
      return {
        message: `¡Existen ${similarReport.length} caso(s) similar(es)!`,
        data: similarReport,
      };
    } else {
      return {
        message: '¡No existen casos similares!',
        data: [],
      };
    }
  }

  async createReportValidate(
    createReportValDto: any,
    clientIp: string,
    caseReportId: string,
    idValidator: string,
  ) {
    await ValDtoValidator(createReportValDto, this.caseTypeRepository);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await Promise.all([
        this.characterizationCasesService.findOneCharacterization(
          createReportValDto.val_cr_characterization_id_fk,
        ),
        this.eventTypeService.findOneEventType(
          createReportValDto.val_cr_eventtype_id_fk,
        ),
        this.eventService.findOneEvent(createReportValDto.val_cr_event_id_fk),
        this.serviceService.findOneService(
          createReportValDto.val_cr_originservice_id_fk,
        ),
        this.serviceService.findOneService(
          createReportValDto.val_cr_reportingservice_id_fk,
        ),
        this.originService.findOneOrigin(
          createReportValDto.val_cr_origin_id_fk,
        ),
        this.subOriginService.findOneSubOrigin(
          createReportValDto.val_cr_suborigin_id_fk,
        ),
        createReportValDto.val_cr_risktype_id_fk &&
          this.riskTypeService.findOneRiskType(
            createReportValDto.ori_cr_risktype_id_fk,
          ),
        createReportValDto.val_cr_severityclasif_id_fk &&
          this.severityClasificationService.findOneSeverityClasification(
            createReportValDto.val_cr_severityclasif_id_fk,
          ),
        createReportValDto.val_cr_risklevel_id_fk &&
          this.riskLevelService.findOneRiskLevel(
            createReportValDto.val_cr_risklevel_id_fk,
          ),
      ]);

      if (!clientIp) {
        throw new HttpException(
          'La dirección IP del usuario es requerido.',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (!idValidator) {
        throw new HttpException(
          'El identificador del validador es requerido.',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (!caseReportId) {
        throw new HttpException(
          'El identificador del caso es requerido.',
          HttpStatus.BAD_REQUEST,
        );
      }

      const previousReport = await this.caseReportValidateRepository.findOne({
        where: {
          id: caseReportId,
          val_cr_validated: false,
        },
      });

      if (!previousReport) {
        throw new HttpException(
          `El reporte no existe o ya fue validado.`,
          HttpStatus.NOT_FOUND,
        );
      }

      if (previousReport) {
        await this.cancelReportValidate(
          previousReport.id,
          clientIp,
          idValidator,
        );

        previousReport.val_cr_validated = true;
        previousReport.deletedAt = new Date();
        await queryRunner.manager.save(previousReport);
      }

      const caseTypeFound = await this.caseTypeRepository.findOne({
        where: {
          id: createReportValDto.val_cr_casetype_id_fk,
        },
      });

      let caseReportValidate: any;

      switch (caseTypeFound.cas_t_name) {
        case CaseTypeReportEnum.RISK:
          caseReportValidate = this.caseReportValidateRepository.create(
            createReportValDto as CreateValRiskReportDto,
          );
          console.log(`Se creó reporte validado ${CaseTypeReportEnum.RISK}`);
          break;
        case CaseTypeReportEnum.ADVERSE_EVENT:
          caseReportValidate = this.caseReportValidateRepository.create(
            createReportValDto as CreateValAdverseEventReportDto,
          );
          console.log(
            `Se creó reporte validado ${CaseTypeReportEnum.ADVERSE_EVENT}`,
          );
          break;
        case CaseTypeReportEnum.INCIDENT:
          caseReportValidate = this.caseReportValidateRepository.create(
            createReportValDto as CreateValIncidentReportDto,
          );
          console.log(
            `Se creó reporte validado ${CaseTypeReportEnum.INCIDENT}`,
          );
          break;
        case CaseTypeReportEnum.INDICATING_UNSAFE_CARE:
          caseReportValidate = this.caseReportValidateRepository.create(
            createReportValDto as CreateValIndicatingUnsafeCareReportDto,
          );
          console.log(
            `Se creó reporte validado ${CaseTypeReportEnum.INDICATING_UNSAFE_CARE}`,
          );
          break;
        case CaseTypeReportEnum.COMPLICATIONS:
          caseReportValidate = this.caseReportValidateRepository.create(
            createReportValDto as CreateValComplicationsReportDto,
          );
          console.log(
            `Se creó reporte validado ${CaseTypeReportEnum.COMPLICATIONS}`,
          );
          break;
        // agregar un tipo de caso nuevo
        default:
          throw new HttpException(
            'Tipo de caso no reconocido.',
            HttpStatus.BAD_REQUEST,
          );
      }

      const consecutiveId = previousReport.val_cr_consecutive_id + 1;
      const previousId = previousReport.val_cr_previous_id + 1;

      const movementReportFound = await queryRunner.manager.findOne(
        MovementReport,
        {
          where: {
            mov_r_name: MovementReportEnum.VALIDATION,
            mov_r_status: true,
          },
        },
      );

      if (!movementReportFound) {
        return new HttpException(
          `El movimiento no existe.`,
          HttpStatus.NOT_FOUND,
        );
      }

      if (
        createReportValDto.val_cr_severityclasif_id_fk !== null &&
        createReportValDto.val_cr_severityclasif_id_fk !== undefined
      ) {
        const priorityFind = await queryRunner.manager.findOne(Priority, {
          where: {
            prior_severityclasif_id_fk:
              createReportValDto.val_cr_severityclasif_id_fk,
            prior_status: true,
          },
        });

        if (!priorityFind) {
          throw new HttpException(
            `La prioridad no existe`,
            HttpStatus.NOT_FOUND,
          );
        }

        caseReportValidate.val_cr_priority_id_fk = priorityFind.id;
      } else {
        caseReportValidate.val_cr_priority_id_fk = null;
      }

      caseReportValidate.val_cr_filingnumber =
        previousReport.val_cr_filingnumber;
      caseReportValidate.val_cr_originalcase_id_fk =
        previousReport.val_cr_originalcase_id_fk;
      caseReportValidate.val_cr_consecutive_id = consecutiveId;
      caseReportValidate.val_cr_previous_id = previousId;
      caseReportValidate.val_cr_statusmovement_id_fk = movementReportFound.id;

      await queryRunner.manager.save(caseReportValidate);

      const hasMedicine =
        createReportValDto.medicines && createReportValDto.medicines.length > 0;

      if (hasMedicine) {
        await this.medicineService.createMedicineTransaction(
          createReportValDto.medicines,
          caseReportValidate.val_cr_originalcase_id_fk,
          queryRunner,
        );
      }

      const hasDevice =
        createReportValDto.devices && createReportValDto.devices.length > 0;

      if (hasDevice) {
        await this.deviceService.createDeviceTransation(
          createReportValDto.devices,
          caseReportValidate.val_cr_originalcase_id_fk,
          queryRunner,
        );
      }

      await this.logService.createLogTransaction(
        queryRunner,
        caseReportValidate.id,
        idValidator,
        clientIp,
        LogReportsEnum.LOG_VALIDATION,
      );

      await queryRunner.commitTransaction();

      return new HttpException(
        `¡El reporte con el consecutivo #${caseReportValidate.val_cr_filingnumber} se validó exitosamente.!`,
        HttpStatus.CREATED,
      );
    } catch (error) {
      await queryRunner.rollbackTransaction();

      throw new HttpException(
        `Un error a ocurrido: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      await queryRunner.release();
    }
  }

  async createReportValidateTransaction(
    queryRunner: QueryRunner,
    caseReportOriginal: CreateCaseReportOriginalDto,
    caseReportOriginalId: string,
  ) {
    const caseReportValidate = this.caseReportValidateRepository.create({
      val_cr_dateofcase: caseReportOriginal.ori_cr_dateofcase,
      val_cr_consecutive_id: 1,
      val_cr_previous_id: 0,
      val_cr_originalcase_id_fk: caseReportOriginalId,
      val_cr_filingnumber: caseReportOriginal.ori_cr_filingnumber,
      val_cr_casetype_id_fk: caseReportOriginal.ori_cr_casetype_id_fk,
      val_cr_documentpatient: caseReportOriginal.ori_cr_documentpatient,
      val_cr_doctypepatient: caseReportOriginal.ori_cr_doctypepatient,
      val_cr_firstnamepatient: caseReportOriginal.ori_cr_firstnamepatient,
      val_cr_secondnamepatient: caseReportOriginal.ori_cr_secondnamepatient,
      val_cr_firstlastnamepatient:
        caseReportOriginal.ori_cr_firstlastnamepatient,
      val_cr_secondlastnamepatient:
        caseReportOriginal.ori_cr_secondlastnamepatient,
      val_cr_agepatient: caseReportOriginal.ori_cr_agepatient,
      val_cr_genderpatient: caseReportOriginal.ori_cr_genderpatient,
      val_cr_epspatient: caseReportOriginal.ori_cr_epspatient,
      val_cr_admconsecutivepatient:
        caseReportOriginal.ori_cr_admconsecutivepatient,
      val_cr_diagnosticcodepatient:
        caseReportOriginal.ori_cr_diagnosticcodepatient,
      val_cr_diagnosticdescriptionpatient:
        caseReportOriginal.ori_cr_diagnosticdescriptionpatient,
      val_cr_foliopatient: caseReportOriginal.ori_cr_foliopatient,
      val_cr_anonymoususer: caseReportOriginal.ori_cr_anonymoususer,
      val_cr_documentreporter: caseReportOriginal.ori_cr_documentreporter,
      val_cr_fullnamereporter: caseReportOriginal.ori_cr_fullnamereporter,
      val_cr_eventtype_id_fk: caseReportOriginal.ori_cr_eventtype_id_fk,
      val_cr_originservice_id_fk: caseReportOriginal.ori_cr_originservice_id_fk,
      val_cr_reportingservice_id_fk:
        caseReportOriginal.ori_cr_reportingservice_id_fk,
      val_cr_event_id_fk: caseReportOriginal.ori_cr_event_id_fk,
      val_cr_descriptionothers: caseReportOriginal.ori_cr_descriptionothers,
      val_cr_risktype_id_fk: caseReportOriginal.ori_cr_risktype_id_fk,
      val_cr_severityclasif_id_fk:
        caseReportOriginal.ori_cr_severityclasif_id_fk,
      val_cr_origin_id_fk: caseReportOriginal.ori_cr_origin_id_fk,
      val_cr_suborigin_id_fk: caseReportOriginal.ori_cr_suborigin_id_fk,
      val_cr_risklevel_id_fk: caseReportOriginal.ori_cr_risklevel_id_fk,
      val_cr_priority_id_fk: caseReportOriginal.ori_cr_priority_id_fk,
      val_cr_statusmovement_id_fk:
        caseReportOriginal.ori_cr_statusmovement_id_fk,
      val_cr_description: caseReportOriginal.ori_cr_description,
      val_cr_inmediateaction: caseReportOriginal.ori_cr_inmediateaction,
      val_cr_materializedrisk: caseReportOriginal.ori_cr_materializedrisk,
      val_cr_associatedpatient: caseReportOriginal.ori_cr_associatedpatient,
    });
    return await queryRunner.manager.save(caseReportValidate);
  }

  async summaryReports() {
    const caseReportsValidate = await this.caseReportValidateRepository.find({
      where: {
        val_cr_status: true,
        val_cr_validated: false,
      },
      relations: {
        caseType: true,
        severityClasification: true,
        event: true,
        priority: true,
        movementReport: true,
        synergy: true
      },
      // withDeleted: true,
      order: {
        createdAt: 'DESC',
      },
    });

    if (caseReportsValidate.length === 0) {
      throw new HttpException(
        'No hay reportes para mostrar.',
        HttpStatus.NOT_FOUND,
      );
    }

    return caseReportsValidate;
  }

  async validateCases() {
    const caseReportsValidate = await this.caseReportValidateRepository.find({
      where: {
        val_cr_status: true,
        val_cr_validated: false,
        movementReport: {
          mov_r_name: In([
            MovementReportEnum.REPORT_CREATION,
            MovementReportEnum.VALIDATION,
          ]),
        },
      },
      relations: {
        caseType: true,
        event: true,
        priority: true,
        movementReport: true,
      },
      // withDeleted: true,
      order: {
        createdAt: 'DESC',
      },
    });

    if (caseReportsValidate.length === 0) {
      throw new HttpException(
        'No hay reportes para mostrar.',
        HttpStatus.NOT_FOUND,
      );
    }

    return caseReportsValidate;
  }

  async otherCases(
    filingNumber?: string,
    statusMovementId?: number,
    caseTypeId?: number,
    patientDoc?: string,
    priorityId?: number,
    creationDate?: Date,
  ) {
    const where: FindOptionsWhere<CaseReportValidate> = {};

    if (creationDate) {
      const nextDay = new Date(creationDate);
      nextDay.setDate(creationDate.getDate() + 1);

      where.createdAt = Between(creationDate, nextDay);
    }

    if (filingNumber) {
      where.val_cr_filingnumber = Like(`%${filingNumber}%`);
    }

    if (patientDoc) {
      where.val_cr_documentpatient = patientDoc;
    }

    if (caseTypeId) {
      where.val_cr_casetype_id_fk = caseTypeId;
    }

    if (priorityId) {
      where.val_cr_priority_id_fk = priorityId;
    }

    if (statusMovementId) {
      where.val_cr_statusmovement_id_fk = statusMovementId;
    } else {
      const namesMovement = [
        MovementReportEnum.ANULATION,
        MovementReportEnum.RETURN_CASE_VALIDATOR,
      ];

      const findMovementNames = await this.movementReportRepository.find({
        where: {
          mov_r_name: In(namesMovement),
        },
        select: ['id'],
      });

      const movementsIds = findMovementNames.map((movementId) => movementId.id);

      where.val_cr_statusmovement_id_fk = In(movementsIds);
    }

    where.val_cr_validated = false;

    const caseReportsValidate = await this.caseReportValidateRepository.find({
      where,
      relations: {
        movementReport: true,
        caseType: true,
        event: true,
        priority: true,
        observationReturnCase: true,
        observationCancellationCase: {
          reasonCancellationCase: true,
        },
      },
      withDeleted: true,
      order: {
        createdAt: 'DESC',
      },
    });

    if (caseReportsValidate.length === 0) {
      throw new HttpException(
        'No hay reportes para mostrar.',
        HttpStatus.NOT_FOUND,
      );
    }

    return caseReportsValidate;
  }

  async findAllReportsValidate() {
    const caseReportValidates = await this.caseReportValidateRepository.find({
      where: { val_cr_validated: false, val_cr_status: true },
      relations: {
        movementReport: true,
        reportAnalystAssignment: true,
        reportResearcherAssignment: true,
        synergy: true,
        caseType: true,
        riskType: true,
        severityClasification: true,
        origin: true,
        subOrigin: true,
        riskLevel: true,
        eventType: true,
        event: true,
        originService: true,
        reportingService: true,
        priority: true,
        characterizationCase: true,
      },
      order: {
        createdAt: 'DESC',
      },
    });

    if (caseReportValidates.length === 0) {
      throw new HttpException(
        'No hay reportes para mostrar.',
        HttpStatus.NOT_FOUND,
      );
    }

    return caseReportValidates;
  }

  async findOneReportValidate(id: string) {
    if (!id) {
      throw new HttpException(
        'El identificador del caso es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const caseReportValidate = await this.caseReportValidateRepository.findOne({
      where: { id, val_cr_validated: false },
      relations: {
        movementReport: true,
        reportAnalystAssignment: true,
        reportResearcherAssignment: true,
        synergy: true,
        caseType: true,
        riskType: true,
        severityClasification: true,
        origin: true,
        subOrigin: true,
        riskLevel: true,
        eventType: true,
        event: true,
        originService: true,
        reportingService: true,
        priority: true,
        characterizationCase: true,
        observationReturnCase: true,
        observationCancellationCase: {
          reasonCancellationCase: true,
        },
      },
    });

    if (!caseReportValidate) {
      throw new HttpException(
        'No se encontró el reporte.',
        HttpStatus.NOT_FOUND,
      );
    }

    return caseReportValidate;
  }

  async findOneReportValidateByConsecutive(consecutive: string) {
    if (!consecutive) {
      throw new HttpException(
        'El consecutivo del caso es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const caseReportValidate = await this.caseReportValidateRepository.find({
      where: {
        val_cr_filingnumber: Like(`%${consecutive}%`),
        val_cr_validated: false,
        val_cr_status: true,
      },
      relations: {
        movementReport: true,
        reportAnalystAssignment: true,
        synergy: true,
        caseType: true,
        riskType: true,
        severityClasification: true,
        origin: true,
        subOrigin: true,
        riskLevel: true,
        eventType: true,
        event: true,
        originService: true,
        reportingService: true,
        priority: true,
        characterizationCase: true,
      },
      order: {
        createdAt: 'DESC',
      },
    });

    if (caseReportValidate.length === 0) {
      throw new HttpException(
        'No se encontró el reporte.',
        HttpStatus.NOT_FOUND,
      );
    }

    return caseReportValidate;
  }

  async cancelReportValidate(id: string, clientIp: string, idUser: string) {
    if (!id) {
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

    if (!idUser) {
      throw new HttpException(
        'El identificador del usuario es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const caseReportValidate = await this.findOneReportValidate(id);

    const movementReportFound = await this.movementReportRepository.findOne({
      where: { mov_r_name: MovementReportEnum.ANULATION, mov_r_status: true },
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
      },
    );

    if (updateStatusMovement.affected === 0) {
      throw new HttpException(
        `No se pudo actualizar el moviemiento del reporte.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    await this.medicineService.deleteMedicinesByCaseId(
      caseReportValidate.val_cr_originalcase_id_fk,
    );
    await this.deviceService.deleteDevicesByCaseId(
      caseReportValidate.val_cr_originalcase_id_fk,
    );

    const result = await this.caseReportValidateRepository.softDelete(
      caseReportValidate.id,
    );

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo anular el reporte.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    await this.logService.createLog(
      caseReportValidate.id,
      idUser,
      clientIp,
      LogReportsEnum.LOG_ANULATION,
    );

    const findReportAnalystAssygnment =
      await this.reportAnalystAssignmentRepository.findOne({
        where: {
          ana_validatedcase_id_fk: caseReportValidate.id,
          ana_status: true,
        },
      });

    if (findReportAnalystAssygnment) {
      await this.reportAnalystAssignmentService.deleteAssignedAnalyst(
        findReportAnalystAssygnment.id,
      );
    }

    const findSynergy = await this.synergyRepository.findOne({
      where: {
        syn_validatedcase_id_fk: caseReportValidate.id,
        syn_status: true,
      },
    });

    if (findSynergy) {
      await this.synergyService.deleteSynergy(findSynergy.id);
    }

    const findResearchAssignment = await this.researchRepository.findOne({
      where: {
        res_validatedcase_id_fk: caseReportValidate.id,
        res_status: true,
      },
    });

    if (findResearchAssignment) {
      await this.researchService.deleteAssignedResearcher(
        findResearchAssignment.id,
      );
    }

    const findObservationReturnCase =
      await this.observationReturnCaseRepository.findOne({
        where: {
          rec_o_validatedcase_id_fk: caseReportValidate.id,
          rec_o_status: true,
        },
      });

    if (findObservationReturnCase) {
      await this.observationReturnCaseService.deleteObservationReturnCase(
        findObservationReturnCase.id,
      );
    }

    return new HttpException(
      `El caso #${caseReportValidate.val_cr_filingnumber} se anuló correctamente!`,
      HttpStatus.OK,
    );
  }
}
