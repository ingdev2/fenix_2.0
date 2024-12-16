import { createSlice } from "@reduxjs/toolkit";

const initialState: ClinicalResearchInfluencingFactor = {
  id: 0,
  inf_fcr_clinicalresearch_id_fk: "",
  inf_fcr_influencingfactor_id_fk: 0,
  inf_fcr_status: true,
  createdAt: "",
  updateAt: "",
  deletedAt: "",
};

export const clinicalResearchInfluencingFactorSlice = createSlice({
  name: "clinicalResearchInfluencingFactor",
  initialState,
  reducers: {
    setIdClinicalResearchInfluencingFactor: (state, action) => {
      state.id = action.payload;
    },
    setClinicalResearchIdFk: (state, action) => {
      state.inf_fcr_clinicalresearch_id_fk = action.payload;
    },
    setInfluencingFactorIdFk: (state, action) => {
      state.inf_fcr_influencingfactor_id_fk = action.payload;
    },
    setStatusClinicalResearchInfluencingFactor: (state, action) => {
      state.inf_fcr_status = action.payload;
    },
    setCreateDateClinicalResearchInfluencingFactor: (state, action) => {
      state.createdAt = action.payload;
    },
    setUpdateDateClinicalResearchInfluencingFactor: (state, action) => {
      state.updateAt = action.payload;
    },
    setDeleteDateClinicalResearchInfluencingFactor: (state, action) => {
      state.deletedAt = action.payload;
    },
    setDefaultValuesClinicalResearchInfluencingFactor: (state) => {
      state.id = 0;
      state.inf_fcr_clinicalresearch_id_fk = "";
      state.inf_fcr_influencingfactor_id_fk = 0;
      state.inf_fcr_status = true;
      state.createdAt = "";
      state.updateAt = "";
      state.deletedAt = "";
    },
  },
});

export const {
  setIdClinicalResearchInfluencingFactor,
  setClinicalResearchIdFk,
  setInfluencingFactorIdFk,
  setStatusClinicalResearchInfluencingFactor,
  setCreateDateClinicalResearchInfluencingFactor,
  setUpdateDateClinicalResearchInfluencingFactor,
  setDeleteDateClinicalResearchInfluencingFactor,
  setDefaultValuesClinicalResearchInfluencingFactor,
} = clinicalResearchInfluencingFactorSlice.actions;

export default clinicalResearchInfluencingFactorSlice.reducer;
