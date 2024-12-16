import { urls } from "@/api/urls";
import { rest } from "@/api";
import { Protocol } from "@/redux/utils/interfaces/configuration/protocol.interface";

export const getProtocols = async () => {
  const url = `${urls.fenix}/protocol/listProtocols`;
  try {
    const res = await rest.get<Protocol[]>(url);
    return res;
  } catch (error) {
    console.log("Error al retornar los protocolos.", error);
  }
};

export const createProtocol = async (data: Protocol) => {
  const url = `${urls.fenix}/protocol/createProtocol/f8d6a571-5b2a-431f-a439-445839a284a0`;
  try {
    const res = await rest.post(url, data);
    return res.data;
  } catch (error) {
    console.log("Error al crear el protocolo.", error);
  }
};

export const deletedProtocol = async (id: number) => {
  const url = `${urls.fenix}/protocol/deleteProtocol/${id}/f8d6a571-5b2a-431f-a439-445839a284a0`;
  try {
    const res = await rest.delete(url);
    return res.data;
  } catch (error) {
    console.log("Error al eliminar el protocolo.", error);
  }
};
