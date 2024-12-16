import { urls } from "@/api/urls";
import { rest } from "@/api";
import { SeverityClasification } from "@/redux/utils/interfaces/configuration/severityClasification";

export const getSeverityClasifications = async () => {
  const url = `${urls.fenix}/severity-clasification/listSeverityClasifications`;
  try {
    const res = await rest.get<SeverityClasification[]>(url);
    return res;
  } catch (error) {
    console.log("Error al retornar las clasificaciones de severidad.", error);
  }
};

export const createSeverityClasification = async (
  data: SeverityClasification
) => {
  const url = `${urls.fenix}/severity-clasification/createSeverityClasification/f8d6a571-5b2a-431f-a439-445839a284a0`;
  try {
    const res = await rest.post(url, data);
    return res.data;
  } catch (error) {
    console.log("Error al crear la clasificación de severidad.", error);
  }
};

export const deletedSeverityClasification = async (id: number) => {
  const url = `${urls.fenix}/severity-clasification/deleteSeverityClasification/${id}/f8d6a571-5b2a-431f-a439-445839a284a0`;
  try {
    const res = await rest.delete(url);
    return res.data;
  } catch (error) {
    console.log("Error al eliminar la clasificación de severidad.", error);
  }
};
