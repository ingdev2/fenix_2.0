import { createSlice } from "@reduxjs/toolkit";

const initialState: CaseReportValidate = {
  id: "",
  val_cr_consecutive_id: 0,
  val_cr_previous_id: 0,
  val_cr_originalcase_id_fk: "",
  val_cr_casetype_id_fk: 0,
  val_cr_filingnumber: "",
  val_cr_documentpatient: "",
  val_cr_doctypepatient: "",
  val_cr_firstnamepatient: "",
  val_cr_secondnamepatient: "",
  val_cr_firstlastnamepatient: "",
  val_cr_secondlastnamepatient: "",
  val_cr_agepatient: 0,
  val_cr_genderpatient: "",
  val_cr_epspatient: "",
  val_cr_admconsecutivepatient: 0,
  val_cr_reporter_id: 0,
  val_cr_eventtype_id_fk: 0,
  val_cr_originservice_id_fk: 0,
  val_cr_reportingservice_id_fk: 0,
  val_cr_event_id_fk: 0,
  val_cr_risktype_id_fk: 0,
  val_cr_severityclasif_id_fk: 0,
  val_cr_origin_id_fk: 0,
  val_cr_suborigin_id_fk: 0,
  val_cr_risklevel_id_fk: 0,
  val_cr_priority_id_fk: 0,
  val_cr_statusmovement_id_fk: 0,
  val_cr_characterization_id_fk: 0,
  val_cr_infoprovidedfamily: false,
  val_cr_clinicalfollowrequired: false,
  val_cr_observationscharacterization: "",
  val_cr_description: "",
  val_cr_inmediateaction: "",
  val_cr_materializedrisk: false,
  val_cr_associatedpatient: true,
  val_cr_validated: false,
  val_cr_status: true,
  createdAt: "",
  updateAt: "",
  deletedAt: "",
};

export const caseReportValidateSlice = createSlice({
  name: "caseReportValidate",
  initialState,
  reducers: {
    setIdCaseReportValidate: (state, action) => {
      state.id = action.payload;
    },
    setConsecutiveIdCaseReportValidate: (state, action) => {
      state.val_cr_consecutive_id = action.payload;
    },
    setPreviousIdCaseReportValidate: (state, action) => {
      state.val_cr_previous_id = action.payload;
    },
    setOriginalCaseIdFk: (state, action) => {
      state.val_cr_originalcase_id_fk = action.payload;
    },
    setCasetypeIdFk: (state, action) => {
      state.val_cr_casetype_id_fk = action.payload;
    },
    setFilingnumberCaseReportValidate: (state, action) => {
      state.val_cr_filingnumber = action.payload;
    },
    setDocumentPatientCaseReportValidate: (state, action) => {
      state.val_cr_documentpatient = action.payload;
    },
    setDoctypePatientCaseReportValidate: (state, action) => {
      state.val_cr_doctypepatient = action.payload;
    },
    setFirstNamePatientCaseReportValidate: (state, action) => {
      state.val_cr_firstnamepatient = action.payload;
    },
    setSecondNamePatientCaseReportValidate: (state, action) => {
      state.val_cr_secondnamepatient = action.payload;
    },
    setFirstLastNamePatientCaseReportValidate: (state, action) => {
      state.val_cr_firstlastnamepatient = action.payload;
    },
    setSecondLastNamePatientCaseReportValidate: (state, action) => {
      state.val_cr_secondlastnamepatient = action.payload;
    },
    setAgePatientCaseReportValidate: (state, action) => {
      state.val_cr_agepatient = action.payload;
    },
    setGenderPatienCaseReportValidatet: (state, action) => {
      state.val_cr_genderpatient = action.payload;
    },
    setEpsPatientCaseReportValidate: (state, action) => {
      state.val_cr_epspatient = action.payload;
    },
    setAdmConsecutivePatientCaseReportValidate: (state, action) => {
      state.val_cr_admconsecutivepatient = action.payload;
    },
    setReporterIdCaseReportValidate: (state, action) => {
      state.val_cr_reporter_id = action.payload;
    },
    setEventtypeIdFk: (state, action) => {
      state.val_cr_eventtype_id_fk = action.payload;
    },
    setOriginServiceIdFk: (state, action) => {
      state.val_cr_originservice_id_fk = action.payload;
    },
    setReportingServiceIdFk: (state, action) => {
      state.val_cr_reportingservice_id_fk = action.payload;
    },
    setEventIdFk: (state, action) => {
      state.val_cr_event_id_fk = action.payload;
    },
    setRisktypeIdFk: (state, action) => {
      state.val_cr_risktype_id_fk = action.payload;
    },
    setSeverityClasifIdFk: (state, action) => {
      state.val_cr_severityclasif_id_fk = action.payload;
    },
    setOriginidFk: (state, action) => {
      state.val_cr_origin_id_fk = action.payload;
    },
    setSuboriginIdFk: (state, action) => {
      state.val_cr_suborigin_id_fk = action.payload;
    },
    setRisklevelIdFk: (state, action) => {
      state.val_cr_risklevel_id_fk = action.payload;
    },
    setPriorityidFk: (state, action) => {
      state.val_cr_priority_id_fk = action.payload;
    },
    setEtatusmovementIdFk: (state, action) => {
      state.val_cr_statusmovement_id_fk = action.payload;
    },
    setCharacterizationIdFk: (state, action) => {
      state.val_cr_characterization_id_fk = action.payload;
    },
    setInfoprovidedFamilyCaseReportValidate: (state, action) => {
      state.val_cr_infoprovidedfamily = action.payload;
    },
    setClinicalFollowRequiredCaseReportValidate: (state, action) => {
      state.val_cr_clinicalfollowrequired = action.payload;
    },
    setObservationsCharacterizationCaseReportValidate: (state, action) => {
      state.val_cr_observationscharacterization = action.payload;
    },
    setDescriptionCaseReportValidate: (state, action) => {
      state.val_cr_description = action.payload;
    },
    setInmediateActionCaseReportValidate: (state, action) => {
      state.val_cr_inmediateaction = action.payload;
    },
    setMaterializedRiskCaseReportValidate: (state, action) => {
      state.val_cr_materializedrisk = action.payload;
    },
    setAssociatedPatientCaseReportValidate: (state, action) => {
      state.val_cr_associatedpatient = action.payload;
    },
    setValidatedCaseReportValidate: (state, action) => {
      state.val_cr_validated = action.payload;
    },
    setStatusCaseReportValidate: (state, action) => {
      state.val_cr_status = action.payload;
    },
    setCreateDateCaseReportValidate: (state, action) => {
      state.createdAt = action.payload;
    },
    setUpdateDateCaseReportValidate: (state, action) => {
      state.updateAt = action.payload;
    },
    setDeleteDateCaseReportValidate: (state, action) => {
      state.deletedAt = action.payload;
    },
    setDefaultValuesCaseReportValidate: (state) => {
      state.id = "";
      state.val_cr_consecutive_id = 0;
      state.val_cr_previous_id = 0;
      state.val_cr_originalcase_id_fk = "";
      state.val_cr_casetype_id_fk = 0;
      state.val_cr_filingnumber = "";
      state.val_cr_documentpatient = "";
      state.val_cr_doctypepatient = "";
      state.val_cr_firstnamepatient = "";
      state.val_cr_secondnamepatient = "";
      state.val_cr_firstlastnamepatient = "";
      state.val_cr_secondlastnamepatient = "";
      state.val_cr_agepatient = 0;
      state.val_cr_genderpatient = "";
      state.val_cr_epspatient = "";
      state.val_cr_admconsecutivepatient = 0;
      state.val_cr_reporter_id = 0;
      state.val_cr_eventtype_id_fk = 0;
      state.val_cr_originservice_id_fk = 0;
      state.val_cr_reportingservice_id_fk = 0;
      state.val_cr_event_id_fk = 0;
      state.val_cr_risktype_id_fk = 0;
      state.val_cr_severityclasif_id_fk = 0;
      state.val_cr_origin_id_fk = 0;
      state.val_cr_suborigin_id_fk = 0;
      state.val_cr_risklevel_id_fk = 0;
      state.val_cr_priority_id_fk = 0;
      state.val_cr_statusmovement_id_fk = 0;
      state.val_cr_characterization_id_fk = 0;
      state.val_cr_infoprovidedfamily = false;
      state.val_cr_clinicalfollowrequired = false;
      state.val_cr_observationscharacterization = "";
      state.val_cr_description = "";
      state.val_cr_inmediateaction = "";
      state.val_cr_materializedrisk = false;
      state.val_cr_associatedpatient = true;
      state.val_cr_validated = false;
      state.val_cr_status = true;
      state.createdAt = "";
      state.updateAt = "";
      state.deletedAt = "";
    },
  },
});

export const {
  setIdCaseReportValidate,
  setConsecutiveIdCaseReportValidate,
  setPreviousIdCaseReportValidate,
  setOriginalCaseIdFk,
  setCasetypeIdFk,
  setFilingnumberCaseReportValidate,
  setDocumentPatientCaseReportValidate,
  setDoctypePatientCaseReportValidate,
  setFirstNamePatientCaseReportValidate,
  setSecondNamePatientCaseReportValidate,
  setFirstLastNamePatientCaseReportValidate,
  setSecondLastNamePatientCaseReportValidate,
  setAgePatientCaseReportValidate,
  setGenderPatienCaseReportValidatet,
  setEpsPatientCaseReportValidate,
  setAdmConsecutivePatientCaseReportValidate,
  setReporterIdCaseReportValidate,
  setEventtypeIdFk,
  setOriginServiceIdFk,
  setReportingServiceIdFk,
  setEventIdFk,
  setRisktypeIdFk,
  setSeverityClasifIdFk,
  setOriginidFk,
  setSuboriginIdFk,
  setRisklevelIdFk,
  setPriorityidFk,
  setEtatusmovementIdFk,
  setCharacterizationIdFk,
  setInfoprovidedFamilyCaseReportValidate,
  setClinicalFollowRequiredCaseReportValidate,
  setObservationsCharacterizationCaseReportValidate,
  setDescriptionCaseReportValidate,
  setInmediateActionCaseReportValidate,
  setMaterializedRiskCaseReportValidate,
  setAssociatedPatientCaseReportValidate,
  setValidatedCaseReportValidate,
  setStatusCaseReportValidate,
  setCreateDateCaseReportValidate,
  setUpdateDateCaseReportValidate,
  setDeleteDateCaseReportValidate,
  setDefaultValuesCaseReportValidate,
} = caseReportValidateSlice.actions;

export default caseReportValidateSlice.reducer;
