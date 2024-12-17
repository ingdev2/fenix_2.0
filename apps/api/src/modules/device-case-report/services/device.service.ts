import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { CreateDeviceDto } from '../dto/create-device.dto';

import { Device } from '../entities/device.entity';

import { QueryRunner, Repository } from 'typeorm';

import { AxiosResponse } from 'axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(Device)
    private readonly deviceRepository: Repository<Device>,

    private readonly httpDeviceService: HttpService,
  ) {}

  async createDeviceTransation(
    devices: CreateDeviceDto[],
    caseId: string,
    queryRunner: QueryRunner,
  ) {
    const existingDevice = await this.deviceRepository.find({
      where: { dev_case_id_fk: caseId },
    });

    if (existingDevice.length > 0) {
      await queryRunner.manager.softRemove(existingDevice);
    }

    for (const device of devices) {
      const dev = this.deviceRepository.create({
        ...device,
        dev_case_id_fk: caseId,
      });

      await queryRunner.manager.save(dev);
    }
  }

  async findAllDevices() {
    const devices = await this.deviceRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });

    if (devices.length === 0) {
      throw new HttpException(
        'No se encontró la lista de dispositivos.',
        HttpStatus.NOT_FOUND,
      );
    }

    return devices;
  }

  async findOneDevice(id: number) {
    if (!id) {
      throw new HttpException(
        'El identificador del dispositivo es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }
    const device = await this.deviceRepository.findOne({
      where: { id },
    });

    if (!device) {
      throw new HttpException(
        'No se encontró el dispositivo.',
        HttpStatus.NOT_FOUND,
      );
    }

    return device;
  }

  async findExternalDevicesQuery(device: string): Promise<AxiosResponse<any>> {
    const url = `${process.env.URL_DEVICES}?device=${device}`;

    const response = await lastValueFrom(
      this.httpDeviceService.get(url, {
        headers: {
          'X-Authorization': process.env.X_TOKEN_VALUE_DEVICES,
        },
      }),
    );

    if (response.status !== 200 || !response.data) {
      return null;
    }

    return response.data;
  }

  async deleteDevice(id: number) {
    const device = await this.findOneDevice(id);
    const result = await this.deviceRepository.softDelete(device.id);

    if (result.affected === 0) {
      return new HttpException(
        `No se pudo eliminar el dispositivo.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return new HttpException(`¡Datos eliminados correctamente!`, HttpStatus.OK);
  }

  async deleteDevicesByCaseId(caseId: string) {
    if (!caseId) {
      throw new HttpException(
        'El identificador del caso es requerido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const findListDevices = await this.deviceRepository.find({
      where: {
        dev_case_id_fk: caseId,
      },
    });

    if (findListDevices.length > 0) {
      for (const device of findListDevices) {
        const result = await this.deviceRepository.softDelete(device.id);

        if (result.affected === 0) {
          return new HttpException(
            `No se pudo eliminar el dispositivo.`,
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      }
      return;
    }
  }
}
