import { rest } from "@/api";
import { urls } from "@/api/urls";
import { Service } from "@/redux/utils/interfaces/configuration/service.interface";

export const getServices = async () => {
  const url = `${urls.fenix}/service/listServices`;
  try {
    const res = await rest.get<Service[]>(url);
    return res;
  } catch (error) {
    console.log("Error al retornar los servicios.", error);
  }
};

export const createService = async (data: Service) => {
  console.log(data);
  const url = `${urls.fenix}/service/createService/f8d6a571-5b2a-431f-a439-445839a284a0`;
  try {
    const res = await rest.post(url, data);
    return res.data;
  } catch (error) {
    console.log("Error al crear el servicio.", error);
  }
};

export const deletedService = async (id: number) => {
  const url = `${urls.fenix}/service/deleteService/${id}/f8d6a571-5b2a-431f-a439-445839a284a0`;
  try {
    const res = await rest.delete(url);
    return res.data;
  } catch (error) {
    console.log("Error al eliminar el servicio.", error);
  }
};
