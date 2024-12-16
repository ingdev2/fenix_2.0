import { urls } from "@/api/urls";
import { rest } from "@/api";
import { Origin } from "@/redux/utils/interfaces/configuration/origin.interface";

export const getOrigins = async () => {
  const url = `${urls.fenix}/origin/listOrigins`;
  try {
    const res = await rest.get<Origin[]>(url);
    return res;
  } catch (error) {
    console.log("Error al retornar los orígines.", error);
  }
};

export const createOrigin = async (data: Origin) => {
  const url = `${urls.fenix}/origin/createOrigin/f8d6a571-5b2a-431f-a439-445839a284a0`;
  try {
    const res = await rest.post(url, data);
    return res.data;
  } catch (error) {
    console.log("Error al crear el origen.", error);
  }
};

export const deletedOrigin = async (id: number) => {
  const url = `${urls.fenix}/origin/deleteOrigin/${id}/f8d6a571-5b2a-431f-a439-445839a284a0`;
  try {
    const res = await rest.delete(url);
    return res.data;
  } catch (error) {
    console.log("Error al eliminar el origen.", error);
  }
};
