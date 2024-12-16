import { createSlice } from "@reduxjs/toolkit";

const initialState: DeviceCaseReport = {
  id: 0,
  dev_case_id_fk: "",
  dev_code: "",
  dev_name: "",
  dev_description: "",
  dev_status: true,
  createdAt: "",
  updateAt: "",
  deletedAt: "",
};

export const deviceCaseReportSlice = createSlice({
  name: "deviceCaseReport",
  initialState,
  reducers: {
    setIdDeviceCaseReport: (state, action) => {
      state.id = action.payload;
    },
    setCaseIdFk: (state, action) => {
      state.dev_case_id_fk = action.payload;
    },
    setCodeDeviceCaseReport: (state, action) => {
      state.dev_code = action.payload;
    },
    setNameDeviceCaseReport: (state, action) => {
      state.dev_name = action.payload;
    },
    setDescriptionDeviceCaseReport: (state, action) => {
      state.dev_description = action.payload;
    },
    setStatusDeviceCaseReport: (state, action) => {
      state.dev_status = action.payload;
    },
    setCreateDateDeviceCaseReport: (state, action) => {
      state.createdAt = action.payload;
    },
    setUpdateDateDeviceCaseReport: (state, action) => {
      state.updateAt = action.payload;
    },
    setDeleteDateDeviceCaseReport: (state, action) => {
      state.deletedAt = action.payload;
    },
    setDefaultValuesDeviceCaseReport: (state) => {
      state.id = 0;
      state.dev_case_id_fk = "";
      state.dev_code = "";
      state.dev_name = "";
      state.dev_description = "";
      state.dev_status = true;
      state.createdAt = "";
      state.updateAt = "";
      state.deletedAt = "";
    },
  },
});

export const {
  setIdDeviceCaseReport,
  setCaseIdFk,
  setCodeDeviceCaseReport,
  setNameDeviceCaseReport,
  setDescriptionDeviceCaseReport,
  setStatusDeviceCaseReport,
  setCreateDateDeviceCaseReport,
  setUpdateDateDeviceCaseReport,
  setDeleteDateDeviceCaseReport,
  setDefaultValuesDeviceCaseReport,
} = deviceCaseReportSlice.actions;

export default deviceCaseReportSlice.reducer;
