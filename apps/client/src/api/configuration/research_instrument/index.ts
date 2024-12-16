import { urls } from "@/api/urls";
import { rest } from "@/api";
import { ResearchInstrument } from "@/redux/utils/interfaces/configuration/researchInstrument";

export const getResearchInstruments = async () => {
  const url = `${urls.fenix}/research-instrument/listResearchInstruments`;
  try {
    const res = await rest.get<ResearchInstrument[]>(url);
    return res;
  } catch (error) {
    console.log("Error al retornar los instrumentos de investigación.", error);
  }
};

export const createResearchInstrument = async (data: ResearchInstrument) => {
  const url = `${urls.fenix}/research-instrument/createResearchInstrument/f8d6a571-5b2a-431f-a439-445839a284a0`;
  try {
    const res = await rest.post(url, data);
    return res.data;
  } catch (error) {
    console.log("Error al crear el instrumento de investigación.", error);
  }
};

export const deletedResearchInstrument = async (id: number) => {
  const url = `${urls.fenix}/research-instrument/deleteResearchInstrument/${id}/f8d6a571-5b2a-431f-a439-445839a284a0`;
  try {
    const res = await rest.delete(url);
    return res.data;
  } catch (error) {
    console.log("Error al eliminar el instrumento de investigación.", error);
  }
};
