import { urls } from "@/api/urls";
import { rest } from "@/api";
import { RiskType } from "@/redux/utils/interfaces/configuration/riskTypeInterface";

export const getRiskTypes = async () => {
  const url = `${urls.fenix}/risk-type/listRiskTypes`;
  try {
    const res = await rest.get<RiskType[]>(url);
    return res;
  } catch (error) {
    console.log("Error al retornar los tipos de riesgo.", error);
  }
};

export const createRiskType = async (data: RiskType) => {
  const url = `${urls.fenix}/risk-type/createRiskType/f8d6a571-5b2a-431f-a439-445839a284a0`;
  try {
    const res = await rest.post(url, data);
    return res.data;
  } catch (error) {
    console.log("Error al crear el tipo de riesgo.", error);
  }
};

export const deletedRiskType = async (id: number) => {
  const url = `${urls.fenix}/risk-type/deleteRiskType/${id}/f8d6a571-5b2a-431f-a439-445839a284a0`;
  try {
    const res = await rest.delete(url);
    return res.data;
  } catch (error) {
    console.log("Error al eliminar el tipo de riesgo.", error);
  }
};
