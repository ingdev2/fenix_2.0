interface ClinicalResearchCaseReportValidate {
  id: number;
  res_crv_clinicalresearch_id_fk: string;
  res_crv_validatedcase_id_fk: string;
  res_crv_status: boolean;
  createdAt: string;
  updateAt: string;
  deletedAt: string | null;
}
