import { urls } from "@/api/urls";
import { rest } from "@/api";
import { Unit } from "@/redux/utils/interfaces/configuration/unit.interface";

export const getUnits = async () => {
  const url = `${urls.fenix}/unit/listUnits`;
  try {
    const res = await rest.get<Unit[]>(url);
    return res;
  } catch (error) {
    console.log("Error al retornar las unidades.", error);
  }
};

export const createUnit = async (data: Unit) => {
  const url = `${urls.fenix}/unit/createUnit/f8d6a571-5b2a-431f-a439-445839a284a0`;
  try {
    const res = await rest.post(url, data);
    return res.data;
  } catch (error) {
    console.log("Error al crear la unidad.", error);
  }
};

export const deletedUnit = async (id: number) => {
  const url = `${urls.fenix}/unit/deleteUnit/${id}/f8d6a571-5b2a-431f-a439-445839a284a0`;
  try {
    const res = await rest.delete(url);
    return res.data;
  } catch (error) {
    console.log("Error al eliminar la unidad.", error);
  }
};
