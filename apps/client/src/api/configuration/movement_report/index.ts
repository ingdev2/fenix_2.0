import { urls } from "@/api/urls";
import { rest } from "@/api";
import { MovementReport } from "@/redux/utils/interfaces/configuration/movementReport";

export const getMovementReports = async () => {
  const url = `${urls.fenix}/movement-report/listMovementReports`;
  try {
    const res = await rest.get<MovementReport[]>(url);
    return res.data;
  } catch (error) {
    console.log("Error al retornar los movimientos de reporte.", error);
  }
};

export const createMovementReport = async (data: MovementReport) => {
  const url = `${urls.fenix}/movement-report/createMovementReport/f8d6a571-5b2a-431f-a439-445839a284a0`;
  try {
    const res = await rest.post(url, data);
    return res.data;
  } catch (error) {
    console.log("Error al crear el movimiento de reporte.", error);
  }
};

export const deletedMovementReport = async (id: number) => {
  const url = `${urls.fenix}/movement-report/deleteMovementReport/${id}/f8d6a571-5b2a-431f-a439-445839a284a0`;
  try {
    const res = await rest.delete(url);
    return res.data;
  } catch (error) {
    console.log("Error al eliminar el movimiento de reporte.", error);
  }
};
