import { rest } from "@/api";
import { urls } from "@/api/urls";
import { Priority } from "@/redux/utils/interfaces/configuration/priority.interface";

export const getPriorities = async () => {
  const url = `${urls.fenix}/priority/listPriorities`;
  try {
    const res = await rest.get<Priority[]>(url);
    return res;
  } catch (error) {
    console.log("Error al retornar las prioridades.", error);
  }
};

export const createPriority = async (data: Priority) => {
  console.log(data);
  const url = `${urls.fenix}/priority/createPriority/f8d6a571-5b2a-431f-a439-445839a284a0`;
  try {
    const res = await rest.post(url, data);
    return res.data;
  } catch (error) {
    console.log("Error al crear la prioridad.", error);
  }
};

export const deletedPriority = async (id: number) => {
  const url = `${urls.fenix}/priority/deletePriority/${id}/f8d6a571-5b2a-431f-a439-445839a284a0`;
  try {
    const res = await rest.delete(url);
    return res.data;
  } catch (error) {
    console.log("Error al eliminar la prioridad.", error);
  }
};
