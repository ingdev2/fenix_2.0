import { urls } from "@/api/urls";
import { rest } from "@/api";
import { RiskFactor } from "@/redux/utils/interfaces/configuration/riskFactor.interface";

export const getRiskFactors = async () => {
  const url = `${urls.fenix}/risk-factor/listRiskFactors`;
  try {
    const res = await rest.get<RiskFactor[]>(url);
    return res;
  } catch (error) {
    console.log("Error al retornar los factores de riesgo.", error);
  }
};

export const createRiskFactor = async (data: RiskFactor) => {
  const url = `${urls.fenix}/risk-factor/createRiskFactor/f8d6a571-5b2a-431f-a439-445839a284a0`;
  try {
    const res = await rest.post(url, data);
    return res.data;
  } catch (error) {
    console.log("Error al crear el factor de riesgo.", error);
  }
};

export const deletedRiskFactor = async (id: number) => {
  const url = `${urls.fenix}/risk-factor/deleteRiskFactor/${id}/f8d6a571-5b2a-431f-a439-445839a284a0`;
  try {
    const res = await rest.delete(url);
    return res.data;
  } catch (error) {
    console.log("Error al eliminar el factor de riesgo.", error);
  }
};
