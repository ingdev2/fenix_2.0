import { urls } from "@/api/urls";
import { rest } from "@/api";
import { SafetyBarrier } from "@/redux/utils/interfaces/configuration/safetyBarrier.interface";

export const getSafetyBarriers = async () => {
  const url = `${urls.fenix}/safety-barriers/listSafetyBarriers`;
  try {
    const res = await rest.get<SafetyBarrier[]>(url);
    return res;
  } catch (error) {
    console.log("Error al retornar las barreras de seguridad.", error);
  }
};

export const createSafetyBarrier = async (data: SafetyBarrier) => {
  const url = `${urls.fenix}/safety-barriers/createSafetyBarrier/f8d6a571-5b2a-431f-a439-445839a284a0`;
  try {
    const res = await rest.post(url, data);
    return res.data;
  } catch (error) {
    console.log("Error al crear la barrera de seguridad.", error);
  }
};

export const deletedSafetyBarrier = async (id: number) => {
  const url = `${urls.fenix}/safety-barriers/deleteSafetyBarrier/${id}/f8d6a571-5b2a-431f-a439-445839a284a0`;
  try {
    const res = await rest.delete(url);
    return res.data;
  } catch (error) {
    console.log("Error al eliminar la barrera de seguridad.", error);
  }
};
