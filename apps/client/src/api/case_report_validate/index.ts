import { urls } from "@/api/urls";
import { rest } from "@/api";
import { CaseReportValidate } from "@/redux/utils/interfaces/case_report_validate/caseReportValidate.interface";

export const getSummaryReports = async () => {
  const url = `${urls.fenix}/case-report-validate/summaryReports`;
  try {
    const res = await rest.get<CaseReportValidate[]>(url);
    return res.data;
  } catch (error) {
    console.log("Error al retornar los reportes.", error);
  }
};

export const getSummaryReportsValidator = async () => {
  const url = `${urls.fenix}/case-report-validate/summaryReportsForValidator/77757048-2cc5-4671-8a3c-8ed4ea4c3bcd`;
  try {
    const res = await rest.get<CaseReportValidate[]>(url);
    return res.data;
  } catch (error) {
    console.log("Error al retornar los reportes.", error);
  }
};

export const getSummaryReportsReview = async () => {
  const url = `${urls.fenix}/case-report-validate/summaryReportsForReview/77757048-2cc5-4671-8a3c-8ed4ea4c3bcd`;
  try {
    const res = await rest.get<CaseReportValidate[]>(url);
    return res.data;
  } catch (error) {
    console.log("Error al retornar los reportes.", error);
  }
};
