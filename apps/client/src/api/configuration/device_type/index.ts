import { urls } from "@/api/urls";
import { rest } from "@/api";
import { DeviceType } from "@/redux/utils/interfaces/configuration/deviceType.interface";

export const getDeviceTypes = async () => {
  const url = `${urls.fenix}/device-type/listDeviceTypes`;
  try {
    const res = await rest.get<DeviceType[]>(url);
    return res;
  } catch (error) {
    console.log("Error al retornar los tipos de dispositivo.", error);
  }
};

export const createDeviceType = async (data: DeviceType) => {
  const url = `${urls.fenix}/device-type/createDeviceType/f8d6a571-5b2a-431f-a439-445839a284a0`;
  try {
    const res = await rest.post(url, data);
    return res.data;
  } catch (error) {
    console.log("Error al crear el tipo de dispositivo.", error);
  }
};

export const deletedDeviceType = async (id: number) => {
  const url = `${urls.fenix}/device-type/deleteDeviceType/${id}/f8d6a571-5b2a-431f-a439-445839a284a0`;
  try {
    const res = await rest.delete(url);
    return res.data;
  } catch (error) {
    console.log("Error al eliminar el tipo de dispositivo.", error);
  }
};
