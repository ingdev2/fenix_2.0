import { urls } from "@/api/urls";
import { rest } from "@/api";
import { RiskLevel } from "@/redux/utils/interfaces/configuration/riskLevel.interface";

export const getRiskLevels = async () => {
  const url = `${urls.fenix}/risk-level/listRiskLevels`;
  try {
    const res = await rest.get<RiskLevel[]>(url);
    return res;
  } catch (error) {
    console.log("Error al retornar los niveles de riesgo.", error);
  }
};

export const createRiskLevel = async (data: RiskLevel) => {
  const url = `${urls.fenix}/risk-level/createRiskLevel/f8d6a571-5b2a-431f-a439-445839a284a0`;
  try {
    const res = await rest.post(url, data);
    return res.data;
  } catch (error) {
    console.log("Error al crear el nivel de riesgo.", error);
  }
};

export const deletedRiskLevel = async (id: number) => {
  const url = `${urls.fenix}/risk-level/deleteRiskLevel/${id}/f8d6a571-5b2a-431f-a439-445839a284a0`;
  try {
    const res = await rest.delete(url);
    return res.data;
  } catch (error) {
    console.log("Error al eliminar el nivel de riesgo.", error);
  }
};
