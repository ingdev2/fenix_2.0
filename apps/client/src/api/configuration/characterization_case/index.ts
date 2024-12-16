import { urls } from "@/api/urls";
import { rest } from "@/api";
import { CharacterizationCase } from "@/redux/utils/interfaces/configuration/characterizationCase.interface";

export const getCharacterizationCases = async () => {
  const url = `${urls.fenix}/characterization-case/listCharacterizationsCase`;
  try {
    const res = await rest.get<CharacterizationCase[]>(url);
    return res;
  } catch (error) {
    console.log("Error al retornar las caracterizaciones de casos.", error);
  }
};

export const createCharacterizationCase = async (
  data: CharacterizationCase
) => {
  const url = `${urls.fenix}/characterization-case/createCharacterizationCase/f8d6a571-5b2a-431f-a439-445839a284a0`;
  try {
    const res = await rest.post(url, data);
    return res.data;
  } catch (error) {
    console.log("Error al crear la caracterización de caso.", error);
  }
};

export const deletedCharacterizationCase = async (id: number) => {
  const url = `${urls.fenix}/characterization-case/deleteCharacterization/${id}/f8d6a571-5b2a-431f-a439-445839a284a0`;
  try {
    const res = await rest.delete(url);
    return res.data;
  } catch (error) {
    console.log("Error al eliminar la caracterización de caso.", error);
  }
};
