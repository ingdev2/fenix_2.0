import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { MedicineService } from '../services/medicine.service';
import { UpdateMedicineDto } from '../dto/update-medicine.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('medicine')
@Controller('medicine')
export class MedicineController {
  constructor(private readonly medicineService: MedicineService) {}

  // @Post('/createMedicine')
  // createMedicine(@Body() createMedicineDto: CreateMedicineDto) {
  //   return this.medicineService.createMedicine(createMedicineDto);
  // }

  @Get('/listMedicines')
  listMedicines() {
    return this.medicineService.findAllMedicines();
  }

  @Get('/findMedicine/:id')
  findMedicine(@Param('id') id: number) {
    return this.medicineService.findOneMedicine(id);
  }

  @Patch('/updateMedicine/:id')
  updateMedicine(
    @Param('id') id: number,
    @Body() updateMedicineDto: UpdateMedicineDto,
  ) {
    return this.medicineService.updateMedicine(id, updateMedicineDto);
  }

  @Delete('/DeleteMedicine/:id')
  DeleteMedicine(@Param('id') id: number) {
    return this.medicineService.deleteMedicine(id);
  }
}
