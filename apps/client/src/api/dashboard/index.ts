import { urls } from "@/api/urls";
import { rest } from "@/api";
import { IReportSearchItem } from "@/redux/utils/interfaces/dashboard/dashboard.interface";

export const findOneReportValidateByConsecutive = async (
  reportSearchValue: string
) => {
  try {
    const url = `${urls.fenix}/case-report-validate/findReportValidateByConsecutive/${reportSearchValue}`;
    const { data } = await rest.get<IReportSearchItem[]>(url);
    if (!data) {
      return [];
    }
    return data;
  } catch (error) {
    throw new Error("Failed to fetch reports");
  }
};
