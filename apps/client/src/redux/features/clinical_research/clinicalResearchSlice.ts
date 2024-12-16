import { createSlice } from "@reduxjs/toolkit";

const initialState: ClinicalResearch = {
  id: "",
  res_c_isComplete: true,
  res_c_instrument_id_fk: 0,
  res_c_failure: true,
  res_c_damage: true,
  res_c_clinicalcontext: "",
  res_c_devicetype_id_fk: 0,
  res_c_otherdevicetype: "",
  res_c_damagetype_id_fk: 0,
  res_c_otherdamagetype: "",
  res_c_fluidtype_id_fk: 0,
  res_c_fluidname: "",
  res_c_phlebitisgeneratingfluid: true,
  res_c_fluidph: 0,
  res_c_adequateinfusiontime: true,
  res_c_infusiontime: 0,
  res_c_adequatedilution: true,
  res_c_fluiddilution: "",
  res_c_otherinfluencingfactors: "",
  res_c_otherfailedmeasures: "",
  res_c_riskfactors_id_fk: 0,
  res_c_otherriskfactors: "",
  res_c_venipuncturetechnique: "",
  res_c_additionalfindings: "",
  res_c_carefailures: true,
  res_c_safetybarriers_id_fk: 0,
  res_c_incorrectactions: true,
  res_c_unsafeactions: true,
  res_c_conclusions: "",
  res_c_casepreventable: true,
  res_c_actionplan_id_fk: 0,
  res_c_status: true,
  createdAt: "",
  updateAt: "",
  deletedAt: "",
};

export const clinicalResearchSlice = createSlice({
  name: "clinicalResearch",
  initialState,
  reducers: {
    setIdClinicalResearch: (state, action) => {
      state.id = action.payload;
    },
    setIsCompleteClinicalResearch: (state, action) => {
      state.res_c_isComplete = action.payload;
    },
    setInstrumentIdFk: (state, action) => {
      state.res_c_instrument_id_fk = action.payload;
    },
    setFailureClinicalResearch: (state, action) => {
      state.res_c_failure = action.payload;
    },
    setDamageClinicalResearch: (state, action) => {
      state.res_c_damage = action.payload;
    },
    setclinicalContextResearch: (state, action) => {
      state.res_c_clinicalcontext = action.payload;
    },
    setDeviceTypeIdFk: (state, action) => {
      state.res_c_devicetype_id_fk = action.payload;
    },
    setOtherDeviceTypeClinicalResearch: (state, action) => {
      state.res_c_otherdevicetype = action.payload;
    },
    setDamageTypeIdFk: (state, action) => {
      state.res_c_damagetype_id_fk = action.payload;
    },
    setOtherDamageTypeClinicalResearch: (state, action) => {
      state.res_c_otherdamagetype = action.payload;
    },
    setFluidTypeIdFk: (state, action) => {
      state.res_c_fluidtype_id_fk = action.payload;
    },
    setFluidNameClinicalResearch: (state, action) => {
      state.res_c_fluidname = action.payload;
    },
    setPhlebitisGeneratingFluidClinicalResearch: (state, action) => {
      state.res_c_phlebitisgeneratingfluid = action.payload;
    },
    setFluidPhClinicalResearch: (state, action) => {
      state.res_c_fluidph = action.payload;
    },
    setAdequateInfusionTimeClinicalResearch: (state, action) => {
      state.res_c_adequateinfusiontime = action.payload;
    },
    setInfusionTimeClinicalResearch: (state, action) => {
      state.res_c_infusiontime = action.payload;
    },
    setAdequateDilutionClinicalResearch: (state, action) => {
      state.res_c_adequatedilution = action.payload;
    },
    setFluidDilutionClinicalResearch: (state, action) => {
      state.res_c_fluiddilution = action.payload;
    },
    setOtherInfluencingFactorsClinicalResearch: (state, action) => {
      state.res_c_otherinfluencingfactors = action.payload;
    },
    setOtherFailedMeasuresClinicalResearch: (state, action) => {
      state.res_c_otherfailedmeasures = action.payload;
    },
    setRiskFactorsIdFk: (state, action) => {
      state.res_c_riskfactors_id_fk = action.payload;
    },
    setOtherRiskFactorsClinicalResearch: (state, action) => {
      state.res_c_otherriskfactors = action.payload;
    },
    setVenipunctureTechniqueClinicalResearch: (state, action) => {
      state.res_c_venipuncturetechnique = action.payload;
    },
    setAdditionalFindingsClinicalResearch: (state, action) => {
      state.res_c_additionalfindings = action.payload;
    },
    setCareFailuresClinicalResearch: (state, action) => {
      state.res_c_carefailures = action.payload;
    },
    setSafetyBarriersIdFk: (state, action) => {
      state.res_c_safetybarriers_id_fk = action.payload;
    },
    setIncorrectActionsClinicalResearch: (state, action) => {
      state.res_c_incorrectactions = action.payload;
    },
    setUnsafeActionsClinicalResearch: (state, action) => {
      state.res_c_unsafeactions = action.payload;
    },
    setConclusionsClinicalResearch: (state, action) => {
      state.res_c_conclusions = action.payload;
    },
    setCasePreventableClinicalResearch: (state, action) => {
      state.res_c_casepreventable = action.payload;
    },
    setActionPlanIdFk: (state, action) => {
      state.res_c_actionplan_id_fk = action.payload;
    },
    setStatusClinicalResearch: (state, action) => {
      state.res_c_status = action.payload;
    },
    setCreateDateClinicalResearch: (state, action) => {
      state.createdAt = action.payload;
    },
    setUpdateDateClinicalResearch: (state, action) => {
      state.updateAt = action.payload;
    },
    setDeleteDateClinicalResearch: (state, action) => {
      state.deletedAt = action.payload;
    },
    setDefaultValuesClinicalResearch: (state) => {
      state.id = "";
      state.res_c_isComplete = true;
      state.res_c_instrument_id_fk = 0;
      state.res_c_failure = true;
      state.res_c_damage = true;
      state.res_c_clinicalcontext = "";
      state.res_c_devicetype_id_fk = 0;
      state.res_c_otherdevicetype = "";
      state.res_c_damagetype_id_fk = 0;
      state.res_c_otherdamagetype = "";
      state.res_c_fluidtype_id_fk = 0;
      state.res_c_fluidname = "";
      state.res_c_phlebitisgeneratingfluid = true;
      state.res_c_fluidph = 0;
      state.res_c_adequateinfusiontime = true;
      state.res_c_infusiontime = 0;
      state.res_c_adequatedilution = true;
      state.res_c_fluiddilution = "";
      state.res_c_otherinfluencingfactors = "";
      state.res_c_otherfailedmeasures = "";
      state.res_c_riskfactors_id_fk = 0;
      state.res_c_otherriskfactors = "";
      state.res_c_venipuncturetechnique = "";
      state.res_c_additionalfindings = "";
      state.res_c_carefailures = true;
      state.res_c_safetybarriers_id_fk = 0;
      state.res_c_incorrectactions = true;
      state.res_c_unsafeactions = true;
      state.res_c_conclusions = "";
      state.res_c_casepreventable = true;
      state.res_c_actionplan_id_fk = 0;
      state.res_c_status = true;
      state.createdAt = "";
      state.updateAt = "";
      state.deletedAt = "";
    },
  },
});

export const {
  setIdClinicalResearch,
  setIsCompleteClinicalResearch,
  setInstrumentIdFk,
  setFailureClinicalResearch,
  setDamageClinicalResearch,
  setclinicalContextResearch,
  setDeviceTypeIdFk,
  setOtherDeviceTypeClinicalResearch,
  setDamageTypeIdFk,
  setOtherDamageTypeClinicalResearch,
  setFluidTypeIdFk,
  setFluidNameClinicalResearch,
  setPhlebitisGeneratingFluidClinicalResearch,
  setFluidPhClinicalResearch,
  setAdequateInfusionTimeClinicalResearch,
  setInfusionTimeClinicalResearch,
  setAdequateDilutionClinicalResearch,
  setFluidDilutionClinicalResearch,
  setOtherInfluencingFactorsClinicalResearch,
  setOtherFailedMeasuresClinicalResearch,
  setRiskFactorsIdFk,
  setOtherRiskFactorsClinicalResearch,
  setVenipunctureTechniqueClinicalResearch,
  setAdditionalFindingsClinicalResearch,
  setCareFailuresClinicalResearch,
  setSafetyBarriersIdFk,
  setIncorrectActionsClinicalResearch,
  setUnsafeActionsClinicalResearch,
  setConclusionsClinicalResearch,
  setCasePreventableClinicalResearch,
  setActionPlanIdFk,
  setStatusClinicalResearch,
  setCreateDateClinicalResearch,
  setUpdateDateClinicalResearch,
  setDeleteDateClinicalResearch,
  setDefaultValuesClinicalResearch,
} = clinicalResearchSlice.actions;

export default clinicalResearchSlice.reducer;
