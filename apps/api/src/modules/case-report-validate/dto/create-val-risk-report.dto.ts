import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsArray,
  ValidateNested,
  IsUUID,
  IsDateString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateDeviceDto } from 'src/modules/device-case-report/dto/create-device.dto';
import { CreateMedicineDto } from 'src/modules/medicine-case-report/dto/create-medicine.dto';

export class CreateValRiskReportDto {
  @IsDateString()
  @IsNotEmpty()
  val_cr_dateofcase: Date;

  @IsNumber()
  @IsNotEmpty()
  val_cr_casetype_id_fk: number;

  @IsBoolean()
  @IsNotEmpty()
  val_cr_anonymoususer: boolean;

  @IsString()
  @IsOptional()
  val_cr_fullnamereporter: string;

  @IsString()
  @IsOptional()
  val_cr_documentreporter: string;

  @IsNumber()
  @IsNotEmpty()
  val_cr_origin_id_fk: number;

  @IsNumber()
  @IsNotEmpty()
  val_cr_suborigin_id_fk: number;

  @IsNumber()
  @IsNotEmpty()
  val_cr_originservice_id_fk: number;

  @IsNumber()
  @IsOptional()
  val_cr_reportingservice_id_fk: number;

  @IsString()
  @IsOptional()
  val_cr_documentpatient: string;

  @IsString()
  @IsOptional()
  val_cr_doctypepatient: string;

  @IsString()
  @IsOptional()
  val_cr_firstnamepatient: string;

  @IsString()
  @IsOptional()
  val_cr_secondnamepatient: string;

  @IsString()
  @IsOptional()
  val_cr_firstlastnamepatient: string;

  @IsString()
  @IsOptional()
  val_cr_secondlastnamepatient: string;

  @IsString()
  @IsOptional()
  val_cr_agepatient: string;

  @IsString()
  @IsOptional()
  val_cr_genderpatient: string;

  @IsString()
  @IsOptional()
  val_cr_epspatient: string;

  @IsString()
  @IsOptional()
  val_cr_diagnosticcodepatient: string;

  @IsString()
  @IsOptional()
  val_cr_diagnosticdescriptionpatient: string;

  @IsNumber()
  @IsOptional()
  val_cr_admconsecutivepatient: number;

  @IsString()
  @IsOptional()
  val_cr_foliopatient: string;

  @IsNumber()
  @IsNotEmpty()
  val_cr_eventtype_id_fk: number;

  @IsNumber()
  @IsNotEmpty()
  val_cr_severityclasif_id_fk: number;

  @IsNumber()
  @IsNotEmpty()
  val_cr_event_id_fk: number;

  @IsString()
  @IsOptional()
  val_cr_descriptionothers: string;

  @IsNumber()
  @IsOptional()
  val_cr_risktype_id_fk: number;

  @IsNotEmpty()
  @IsString()
  val_cr_description: string;

  @IsBoolean()
  @IsOptional()
  val_cr_materializedrisk: boolean;

  @IsBoolean()
  @IsNotEmpty()
  val_cr_associatedpatient: boolean;

  @IsNumber()
  @IsOptional()
  val_cr_characterization_id_fk: number;

  @IsBoolean()
  @IsOptional()
  val_cr_infoprovidedfamily: boolean;

  @IsBoolean()
  @IsOptional()
  val_cr_clinicalfollowrequired: boolean;

  @IsString()
  @IsOptional()
  val_cr_observationscharacterization: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateMedicineDto)
  medicines: CreateMedicineDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateDeviceDto)
  devices: CreateDeviceDto[];
}
