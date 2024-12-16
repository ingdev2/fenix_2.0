import { urls } from "@/api/urls";
import { rest } from "@/api";
import { CaseType } from "@/redux/utils/interfaces/configuration/caseType.interface";

export const getCaseTypes = async () => {
  const url = `${urls.fenix}/case-type/listCaseTypes`;
  try {
    const res = await rest.get<CaseType[]>(url);
    return res;
  } catch (error) {
    console.log("Error al retornar los tipos de caso.", error);
  }
};

export const createCaseType = async (data: CaseType) => {
  const url = `${urls.fenix}/case-type/createCaseType/f8d6a571-5b2a-431f-a439-445839a284a0`;
  try {
    const res = await rest.post(url, data);
    return res.data;
  } catch (error) {
    console.log("Error al crear el tipo de caso.", error);
  }
};

export const updateCaseType = async (caseTypeId: number, data: CaseType) => {
  const url = `${urls.fenix}/case-type/updateCaseType/${caseTypeId}/f8d6a571-5b2a-431f-a439-445839a284a0`;
  try {
    const res = await rest.put(url, data);
    return res.data;
  } catch (error) {
    console.log("Error al crear el tipo de caso.", error);
  }
};

export const deletedCaseType = async (id: number) => {
  const url = `${urls.fenix}/case-type/deleteCaseType/${id}/f8d6a571-5b2a-431f-a439-445839a284a0`;
  try {
    const res = await rest.delete(url);
    return res.data;
  } catch (error) {
    console.log("Error al eliminar el tipo de caso.", error);
  }
};
