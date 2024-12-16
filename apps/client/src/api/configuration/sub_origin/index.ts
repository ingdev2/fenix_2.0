import { rest } from "@/api";
import { urls } from "@/api/urls";
import { SubOrigin } from "@/redux/utils/interfaces/configuration/subOrigin.interface";

export const getSubOrigins = async () => {
  const url = `${urls.fenix}/sub-origin/listSubOrigins`;
  try {
    const res = await rest.get<SubOrigin[]>(url);
    return res;
  } catch (error) {
    console.log("Error al retornar los sub origenes.", error);
  }
};

export const createSubOrigin = async (data: SubOrigin) => {
  console.log(data);
  const url = `${urls.fenix}/sub-origin/createSubOrigin/f8d6a571-5b2a-431f-a439-445839a284a0`;
  try {
    const res = await rest.post(url, data);
    return res.data;
  } catch (error) {
    console.log("Error al crear el sub origen.", error);
  }
};

export const deletedSubOrigin = async (id: number) => {
  const url = `${urls.fenix}/sub-origin/deleteSubOrigin/${id}/f8d6a571-5b2a-431f-a439-445839a284a0`;
  try {
    const res = await rest.delete(url);
    return res.data;
  } catch (error) {
    console.log("Error al eliminar el sub origen.", error);
  }
};
