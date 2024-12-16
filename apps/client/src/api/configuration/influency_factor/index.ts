import { urls } from "@/api/urls";
import { rest } from "@/api";
import { InfluencyFactor } from "@/redux/utils/interfaces/configuration/influencingFactor.interface";

export const getInfluencyFactors = async () => {
  const url = `${urls.fenix}/influencing-factor/listInfluencingFactors`;
  try {
    const res = await rest.get<InfluencyFactor[]>(url);
    return res;
  } catch (error) {
    console.log("Error al retornar los factores de influencia.", error);
  }
};

export const createInfluencyFactor = async (data: InfluencyFactor) => {
  const url = `${urls.fenix}/influencing-factor/createInfluencingFactor/f8d6a571-5b2a-431f-a439-445839a284a0`;
  try {
    const res = await rest.post(url, data);
    return res.data;
  } catch (error) {
    console.log("Error al crear el el factor de influencia.", error);
  }
};

export const deletedInfluencyFactor = async (id: number) => {
  const url = `${urls.fenix}/influencing-factor/deleteInfluencingFactor/${id}/f8d6a571-5b2a-431f-a439-445839a284a0`;
  try {
    const res = await rest.delete(url);
    return res.data;
  } catch (error) {
    console.log("Error al eliminar el factor de influencia.", error);
  }
};
