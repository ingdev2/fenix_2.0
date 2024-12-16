import { urls } from "@/api/urls";
import { rest } from "@/api";
import { DamageType } from "@/redux/utils/interfaces/configuration/damageType.interface";

export const getDamageTypes = async () => {
  const url = `${urls.fenix}/damage-type/listDamageTypes`;
  try {
    const res = await rest.get<DamageType[]>(url);
    return res;
  } catch (error) {
    console.log("Error al retornar los tipos de daño.", error);
  }
};

export const createDamageType = async (data: DamageType) => {
  const url = `${urls.fenix}/damage-type/createDamageType/f8d6a571-5b2a-431f-a439-445839a284a0`;
  try {
    const res = await rest.post(url, data);
    return res.data;
  } catch (error) {
    console.log("Error al crear el tipo de daño.", error);
  }
};

export const deletedDamageType = async (id: number) => {
  const url = `${urls.fenix}/damage-type/deleteDamageType/${id}/f8d6a571-5b2a-431f-a439-445839a284a0`;
  try {
    const res = await rest.delete(url);
    return res.data;
  } catch (error) {
    console.log("Error al eliminar el tipo de daño.", error);
  }
};
