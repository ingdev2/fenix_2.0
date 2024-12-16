import { urls } from "@/api/urls";
import { rest } from "@/api";
import {
  Role,
} from "@/redux/utils/interfaces/configuration/role.interface";

export const getRoles = async () => {
  const url = `${urls.fenix}/role-permission/listRoles`;
  try {
    const res = await rest.get<Role[]>(url);
    return res;
  } catch (error) {
    console.log("Error al retornar los roles.", error);
  }
};

export const createRole = async (data: Role) => {
  const url = `${urls.fenix}/role-permission/createRole/f8d6a571-5b2a-431f-a439-445839a284a0`;
  try {
    const res = await rest.post(url, data);
    return res.data;
  } catch (error) {
    console.log("Error al crear el rol.", error);
  }
};

export const deletedRole = async (id: number) => {
  const url = `${urls.fenix}/role-permission/deleteRole/${id}/f8d6a571-5b2a-431f-a439-445839a284a0`;
  try {
    const res = await rest.delete(url);
    return res.data;
  } catch (error) {
    console.log("Error al eliminar el rol.", error);
  }
};
