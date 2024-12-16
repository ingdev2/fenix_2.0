import { EventType } from "@/redux/utils/interfaces/configuration/eventType.interface";
import { urls } from "@/api/urls";
import { rest } from "@/api";

export const getEventTypes = async () => {
  const url = `${urls.fenix}/event-type/listEventTypes`;
  try {
    const res = await rest.get<EventType[]>(url);
    return res;
  } catch (error) {
    console.log("Error al retornar las Estrategias.", error);
  }
};

export const createEventType = async (data: EventType) => {
  const url = `${urls.fenix}/event-type/createEventType/f8d6a571-5b2a-431f-a439-445839a284a0`;
  try {
    const res = await rest.post(url, data);
    return res.data;
  } catch (error) {
    console.log("Error al crear la Estrategia.", error);
  }
};

export const deletedEventType = async (id: number) => {
  const url = `${urls.fenix}/event-type/deleteEventType/${id}/f8d6a571-5b2a-431f-a439-445839a284a0`;
  try {
    const res = await rest.delete(url);
    return res.data;
  } catch (error) {
    console.log("Error al eliminar la Estrategia.", error);
  }
};
