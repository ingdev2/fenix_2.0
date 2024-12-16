import { createSlice } from "@reduxjs/toolkit";

const initialState: ReportAnalistAssignment = {
  id: 0,
  ana_validatedcase_id_fk: "",
  ana_position_id_fk: 0,
  ana_useranalyst_id: "",
  ana_uservalidator_id: "",
  ana_days: 0,
  ana_amountreturns: 0,
  ana_isreturned: false,
  ana_justifications: "",
  ana_status: true,
  createdAt: "",
  updateAt: "",
  deletedAt: "",
};

export const reportAnalistAssignmentSlice = createSlice({
  name: "reportAnalistAssignment",
  initialState,
  reducers: {
    setIdReportAnalistAssignment: (state, action) => {
      state.id = action.payload;
    },
    setValidateCaseIdFk: (state, action) => {
      state.ana_validatedcase_id_fk = action.payload;
    },
    setPositionIdFk: (state, action) => {
      state.ana_position_id_fk = action.payload;
    },
    setUserAnalystIdReportAnalistAssignment: (state, action) => {
      state.ana_useranalyst_id = action.payload;
    },
    setUserValidatorIdReportAnalistAssignment: (state, action) => {
      state.ana_uservalidator_id = action.payload;
    },
    setDaysReportAnalistAssignment: (state, action) => {
      state.ana_days = action.payload;
    },
    setAmountReturnsReportAnalistAssignment: (state, action) => {
      state.ana_amountreturns = action.payload;
    },
    setIsReturnedReportAnalistAssignment: (state, action) => {
      state.ana_isreturned = action.payload;
    },
    setJustificationsReportAnalistAssignment: (state, action) => {
      state.ana_justifications = action.payload;
    },
    setStatusReportAnalistAssignment: (state, action) => {
      state.ana_status = action.payload;
    },
    setCreateDateReportAnalistAssignment: (state, action) => {
      state.createdAt = action.payload;
    },
    setUpdateDateReportAnalistAssignment: (state, action) => {
      state.updateAt = action.payload;
    },
    setDeleteDateReportAnalistAssignment: (state, action) => {
      state.deletedAt = action.payload;
    },
    setDefaultValuesReportAnalistAssignment: (state) => {
      state.id = 0;
      state.ana_validatedcase_id_fk = "";
      state.ana_position_id_fk = 0;
      state.ana_useranalyst_id = "";
      state.ana_uservalidator_id = "";
      state.ana_days = 0;
      state.ana_amountreturns = 0;
      state.ana_isreturned = false;
      state.ana_justifications = "";
      state.ana_status = true;
      state.createdAt = "";
      state.updateAt = "";
      state.deletedAt = "";
    },
  },
});

export const {
  setIdReportAnalistAssignment,
  setValidateCaseIdFk,
  setPositionIdFk,
  setUserAnalystIdReportAnalistAssignment,
  setUserValidatorIdReportAnalistAssignment,
  setDaysReportAnalistAssignment,
  setAmountReturnsReportAnalistAssignment,
  setIsReturnedReportAnalistAssignment,
  setJustificationsReportAnalistAssignment,
  setStatusReportAnalistAssignment,
  setCreateDateReportAnalistAssignment,
  setUpdateDateReportAnalistAssignment,
  setDeleteDateReportAnalistAssignment,
  setDefaultValuesReportAnalistAssignment,
} = reportAnalistAssignmentSlice.actions;

export default reportAnalistAssignmentSlice.reducer;
