import { rest } from "@/api";
import { urls } from "@/api/urls";
import { ReasonReturnCase } from "@/redux/utils/interfaces/configuration/reasonReturnCase.interface";

export const getReasonReturnCases = async () => {
  const url = `${urls.fenix}/reason-return-case/listReasonReturnCases`;
  try {
    const res = await rest.get<ReasonReturnCase[]>(url);
    return res;
  } catch (error) {
    console.log("Error al retornar las razones de devolución de caso.", error);
  }
};

export const createReasonReturnCase = async (data: ReasonReturnCase) => {
  console.log(data);
  const url = `${urls.fenix}/reason-return-case/createReasonReturnCase/f8d6a571-5b2a-431f-a439-445839a284a0`;
  try {
    const res = await rest.post(url, data);
    return res.data;
  } catch (error) {
    console.log("Error al crear la razón de devolución de caso.", error);
  }
};

export const deletedReasonReturnCase = async (id: number) => {
  const url = `${urls.fenix}/reason-return-case/deleteReasonReturnCase/${id}/f8d6a571-5b2a-431f-a439-445839a284a0`;
  try {
    const res = await rest.delete(url);
    return res.data;
  } catch (error) {
    console.log("Error al eliminar la razón de devolución de caso.", error);
  }
};
