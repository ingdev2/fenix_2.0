import { urls } from "@/api/urls";
import { rest } from "@/api";
import { UnsafeAction } from "@/redux/utils/interfaces/configuration/unsafeAction.interface";

export const getUnsafeActions = async () => {
  const url = `${urls.fenix}/unsafe-action/listUnsafeActions`;
  try {
    const res = await rest.get<UnsafeAction[]>(url);
    return res;
  } catch (error) {
    console.log("Error al retornar las acciones inseguras.", error);
  }
};

export const createUnsafeAction = async (data: UnsafeAction) => {
  const url = `${urls.fenix}/unsafe-action/createUnsafeAction/f8d6a571-5b2a-431f-a439-445839a284a0`;
  try {
    const res = await rest.post(url, data);
    return res.data;
  } catch (error) {
    console.log("Error al crear la acción insegura.", error);
  }
};

export const deletedUnsafeAction = async (id: number) => {
  const url = `${urls.fenix}/unsafe-action/deleteUnsafeAction/${id}/f8d6a571-5b2a-431f-a439-445839a284a0`;
  try {
    const res = await rest.delete(url);
    return res.data;
  } catch (error) {
    console.log("Error al eliminar la acción insegura.", error);
  }
};
