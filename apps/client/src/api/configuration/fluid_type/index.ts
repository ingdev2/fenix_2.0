import { urls } from "@/api/urls";
import { rest } from "@/api";
import { FluidType } from "@/redux/utils/interfaces/configuration/fluidType.interface";

export const getFluidTypes = async () => {
  const url = `${urls.fenix}/fluid-type/listFluidTypes`;
  try {
    const res = await rest.get<FluidType[]>(url);
    return res.data;
  } catch (error) {
    console.log("Error al retornar los tipos de fluido.", error);
  }
};

export const createFluidType = async (data: FluidType) => {
  const url = `${urls.fenix}/fluid-type/createFluidType/f8d6a571-5b2a-431f-a439-445839a284a0`;
  try {
    const res = await rest.post(url, data);
    return res.data;
  } catch (error) {
    console.log("Error al crear el tipo de fluido.", error);
  }
};

export const deletedFluidType = async (id: number) => {
  const url = `${urls.fenix}/fluid-type/deleteFluidType/${id}/f8d6a571-5b2a-431f-a439-445839a284a0`;
  try {
    const res = await rest.delete(url);
    return res.data;
  } catch (error) {
    console.log("Error al eliminar el tipo de fluido.", error);
  }
};
