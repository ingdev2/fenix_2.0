import { urls } from "@/api/urls";
import { rest } from "@/api";
import { Event } from "@/redux/utils/interfaces/configuration/event.interface";

export const getEvents = async () => {
  const url = `${urls.fenix}/event/listEvents`;
  try {
    const res = await rest.get<Event[]>(url);
    return res;
  } catch (error) {
    console.log("Error al retornar los sucesos.", error);
  }
};

export const createEvent = async (data: Event) => {
  const url = `${urls.fenix}/event/createEvent/f8d6a571-5b2a-431f-a439-445839a284a0`;
  try {
    const res = await rest.post(url, data);
    return res.data;
  } catch (error) {
    console.log("Error al crear los sucesos.", error);
  }
};

export const updateEvent = async (data: Event) => {
  const url = `${urls.fenix}/event/updateEvent/f8d6a571-5b2a-431f-a439-445839a284a0`;
  try {
    const res = await rest.patch(url, data);
    return res.data;
  } catch (error) {
    console.log("Error al actualizar los sucesos.", error);
  }
};

export const deletedEvent = async (id: number) => {
  const url = `${urls.fenix}/event/deleteEvent/${id}/f8d6a571-5b2a-431f-a439-445839a284a0`;
  try {
    const res = await rest.delete(url);
    return res.data;
  } catch (error) {
    console.log("Error al eliminar los sucesos.", error);
  }
};
