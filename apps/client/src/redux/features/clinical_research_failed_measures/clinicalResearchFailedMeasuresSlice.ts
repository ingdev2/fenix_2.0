import { createSlice } from "@reduxjs/toolkit";

const initialState: clinicalResearchFailedMeasures = {
  id: 0,
  meas_fcr_clinicalresearch_id_fk: "",
  meas_fcr_failedmeasure_id_fk: 0,
  meas_fcr_status: true,
  createdAt: "",
  updateAt: "",
  deletedAt: "",
};

export const clinicalResearchFailedMeasuresSlice = createSlice({
  name: "clinicalResearchFailedMeasures",
  initialState,
  reducers: {
    setIdclinicalResearchFailedMeasures: (state, action) => {
      state.id = action.payload;
    },
    setClinicalResearchIdFk: (state, action) => {
      state.meas_fcr_clinicalresearch_id_fk = action.payload;
    },
    setFailedMeasureIdFk: (state, action) => {
      state.meas_fcr_failedmeasure_id_fk = action.payload;
    },
    setStatusclinicalResearchFailedMeasures: (state, action) => {
      state.meas_fcr_status = action.payload;
    },
    setCreateDateclinicalResearchFailedMeasures: (state, action) => {
      state.createdAt = action.payload;
    },
    setUpdateDateclinicalResearchFailedMeasures: (state, action) => {
      state.updateAt = action.payload;
    },
    setDeleteDateclinicalResearchFailedMeasures: (state, action) => {
      state.deletedAt = action.payload;
    },
    setDefaultValuesclinicalResearchFailedMeasures: (state) => {
      state.id = 0;
      state.meas_fcr_clinicalresearch_id_fk = "";
      state.meas_fcr_failedmeasure_id_fk = 0;
      state.meas_fcr_status = true;
      state.createdAt = "";
      state.updateAt = "";
      state.deletedAt = "";
    },
  },
});

export const {
  setIdclinicalResearchFailedMeasures,
  setClinicalResearchIdFk,
  setFailedMeasureIdFk,
  setStatusclinicalResearchFailedMeasures,
  setCreateDateclinicalResearchFailedMeasures,
  setUpdateDateclinicalResearchFailedMeasures,
  setDeleteDateclinicalResearchFailedMeasures,
  setDefaultValuesclinicalResearchFailedMeasures,
} = clinicalResearchFailedMeasuresSlice.actions;

export default clinicalResearchFailedMeasuresSlice.reducer;
