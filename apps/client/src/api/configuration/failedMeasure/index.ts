import { urls } from "@/api/urls";
import { rest } from "@/api";
import { FailedMeasure } from "@/redux/utils/interfaces/configuration/failedMeasure.interface";

export const getFailedMeasures = async () => {
  const url = `${urls.fenix}/failed-measures/listFailedMeasures`;
  try {
    const res = await rest.get<FailedMeasure[]>(url);
    return res;
  } catch (error) {
    console.log("Error al retornar los tipos de fluido.", error);
  }
};

export const createFailedMeasure = async (data: FailedMeasure) => {
  const url = `${urls.fenix}/failed-measures/createFailedMeasure/f8d6a571-5b2a-431f-a439-445839a284a0`;
  try {
    const res = await rest.post(url, data);
    return res.data;
  } catch (error) {
    console.log("Error al crear el tipo de fluido.", error);
  }
};

export const deletedFailedMeasure = async (id: number) => {
  const url = `${urls.fenix}/failed-measures/deleteFailedMeasure/${id}/f8d6a571-5b2a-431f-a439-445839a284a0`;
  try {
    const res = await rest.delete(url);
    return res.data;
  } catch (error) {
    console.log("Error al eliminar el tipo de fluido.", error);
  }
};
