import { createSlice } from "@reduxjs/toolkit";

const initialState: ClinicalResearchCaseReportValidate = {
  id: 0,
  res_crv_clinicalresearch_id_fk: "",
  res_crv_validatedcase_id_fk: "",
  res_crv_status: true,
  createdAt: "",
  updateAt: "",
  deletedAt: "",
};

export const clinicalResearchCaseReportValidateSlice = createSlice({
  name: "clinicalResearchCaseReportValidate",
  initialState,
  reducers: {
    setIdClinicalResearchCaseReportValidate: (state, action) => {
      state.id = action.payload;
    },
    setClinicalResearchIdFk: (state, action) => {
      state.res_crv_clinicalresearch_id_fk = action.payload;
    },
    setValidatedCaseIdFk: (state, action) => {
      state.res_crv_validatedcase_id_fk = action.payload;
    },
    setStatusClinicalResearchCaseReportValidate: (state, action) => {
      state.res_crv_status = action.payload;
    },
    setCreateDateClinicalResearchCaseReportValidate: (state, action) => {
      state.createdAt = action.payload;
    },
    setUpdateDateClinicalResearchCaseReportValidate: (state, action) => {
      state.updateAt = action.payload;
    },
    setDeleteDateClinicalResearchCaseReportValidate: (state, action) => {
      state.deletedAt = action.payload;
    },
    setDefaultValuesClinicalResearchCaseReportValidate: (state) => {
      state.id = 0;
      state.res_crv_clinicalresearch_id_fk = "";
      state.res_crv_validatedcase_id_fk = "";
      state.res_crv_status = true;
      state.createdAt = "";
      state.updateAt = "";
      state.deletedAt = "";
    },
  },
});

export const {
  setIdClinicalResearchCaseReportValidate,
  setClinicalResearchIdFk,
  setValidatedCaseIdFk,
  setStatusClinicalResearchCaseReportValidate,
  setCreateDateClinicalResearchCaseReportValidate,
  setUpdateDateClinicalResearchCaseReportValidate,
  setDeleteDateClinicalResearchCaseReportValidate,
  setDefaultValuesClinicalResearchCaseReportValidate,
} = clinicalResearchCaseReportValidateSlice.actions;

export default clinicalResearchCaseReportValidateSlice.reducer;
