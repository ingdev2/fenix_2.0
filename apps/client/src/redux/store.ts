import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistReducer } from "redux-persist";
import storage from "./storage/storage";

import actionPlanReducer from "./features/action_plan/actionPlanSlice";
import actionPlanActivityReducer from "./features/action_plan_activity/actionPlanActivitySlice";
import caseReportValidateReducer from "./features/case_report_validate/caseReportValidateSlice";
import caseTypeReducer from "./features/case_type/caseTypeSlice";
import characterizationCaseReducer from "./features/characterization_case/characterizationCaseSlice";
import clinicalResearchReducer from "./features/clinical_research/clinicalResearchSlice";
import clinicalResearchCaseReportValidateReducer from "./features/clinical-research_case_report_validate/clinicalResearchCaseReportValidateSlice";
import clinicalResearchFailedMeasuresReducer from "./features/clinical_research_failed_measures/clinicalResearchFailedMeasuresSlice";
import clinicalResearchInfluencingFactorReducer from "./features/clinical_research_influencing_factor/clinicalResearchInfluencingFactorSlice";
import damageTypeReducer from "./features/damage_type/damageTypeSlice";
import deviceTypeReducer from "./features/device_type/deviceTypeSlice";
import deviceCaseReportReducer from "./features/device_case_report/deviceCaseReportSlice";
import eventReducer from "./features/event/eventSlice";
import eventTypeReducer from "./features/event_type/eventTypeSlice";
import failedMeasureReducer from "./features/failed_measure/failedMeasureSlice";
import fluidTypeReducer from "./features/fluid_type/fluidTypeSlice";
import InfluencingFactorReducer from "./features/influencing_factor/influencingFactorSlice";
import logReducer from "./features/Log/logSlice";
import medicineCaseReportReducer from "./features/medicine_case_report/medicineCaseReportSlice";
import movementReportReducer from "./features/movement_report/movementReportSlice";
import originReducer from "./features/origin/originSlice";
import observationReturnCaseReducer from "./features/observation_return_case/observationReturnCaseSlice";
import patientReducer from "./features/patient/patientSlice";
import positionReducer from "./features/position/positionSlice";
import priorityReducer from "./features/priority/prioritySlice";
import protocolReducer from "./features/protocol/protocolSlice";
import reasonReturnCaseReducer from "./features/reason_return_case/reasonReturnCaseSlice";
import reportAnalistAssignmentReducer from "./features/report_analist_assignment/reportAnalistAssignmentSlice";
import reportResearcherAssignmentReducer from "./features/report_researcher_assignment/reportResearcherAssignmentSlice";
import researchInstrumentReducer from "./features/research_instrument/researchInstrumentSlice";
import riskFactorReducer from "./features/risk_factor/riskFactorSlice";
import riskLevelReducer from "./features/risk_level/riskLevelSlice";
import riskTypeReducer from "./features/risk_type/riskTypeSlice";
import roleSReducer from "./features/role/roleSlice";
import roleResponseTimeReducer from "./features/role-response-time/roleResponseTimeSlice";
import safetyBarrierReducer from "./features/safety_barrier/safetyBarrierSlice";
import serviceReducer from "./features/service/serviceSlice";
import severityClasificationReducer from "./features/severity_clasification/severityClasificationSlice";
import subOriginReducer from "./features/sub-origin/subOriginSlice";
import unitReducer from "./features/unit/unitSlice";
import unsafeActionReducer from "./features/unsafe_action/unsafeActionSlice";
import compressionConceptReportReducer from "./features/compression-concept-reports/compressionConceptReportSlice";
import changeOfCaseTypeReducer from "./features/common/change_of_case_type/changeOfCaseTypeSlice";
import oncologyCategoryReducer from "./features/oncology_category/oncologyCategorySlice";
import itemMenuSelectedKeyReducer from "./features/common/item_menu_selected_key/itemMenuSelectedKeySlice";

import { unitApi } from "./apis/unit/unitApi";
import { caseTypeApi } from "./apis/case_type/caseTypeApi";
import { riskTypeApi } from "./apis/risk_type/riskTypeApi";
import { severityClasificationApi } from "./apis/severity_clasification/severityClasificationApi";
import { originApi } from "./apis/origin/originApi";
import { riskLevelApi } from "./apis/risk_level/riskLevelApi";
import { characterizationCaseApi } from "./apis/characterization_case/charecterizationCaseApi";
import { roleApi } from "./apis/role/roleApi";
import { researchInstrumentApi } from "./apis/research_instrument/researchInstrumentApi";
import { deviceTypeApi } from "./apis/device_type/deviceTypeApi";
import { damageTypeApi } from "./apis/damage_type/damageTypeApi";
import { fluidTypeApi } from "./apis/fluid_type/fluidTypeApi";
import { influencingFactorApi } from "./apis/influencing_factor/influencingFactorApi";
import { failedMeasureApi } from "./apis/failed_measure/failedMeasureApi";
import { safetyBarrierApi } from "./apis/safety_barrier/safetyBarrierApi";
import { riskFactorApi } from "./apis/risk_factor/riskFactorApi";
import { protocolApi } from "./apis/protocol/protocolApi";
import { unsafeActionApi } from "./apis/unsafe_action/unsafeActionApi";
import { movementReportApi } from "./apis/movement_report/movementReportApi";
import { serviceApi } from "./apis/service/serviceApi";
import { subOriginApi } from "./apis/sub_origin/subOriginApi";
import { priorityApi } from "./apis/priority/priorityApi";
import { reasonReturnCaseApi } from "./apis/reason_return_case/reasonReturnCase";
import { eventTypeApi } from "./apis/event_type/eventTypeApi";
import { eventApi } from "./apis/event/eventApi";
import { compressionConceptReportApi } from "./apis/compression_concept_report/compressionConceptReportApi";
import { oncologyCategoryApi } from "./apis/oncology_category/oncologyCategory";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["changeOfCaseType"],
  blacklist: [],
};

const rootReducer = combineReducers({
  actionPlan: actionPlanReducer,
  actionPlanActivity: actionPlanActivityReducer,
  caseReportValidate: caseReportValidateReducer,
  caseType: caseTypeReducer,
  characterizationCase: characterizationCaseReducer,
  clinicalResearch: clinicalResearchReducer,
  clinicalResearchCaseReportValidate: clinicalResearchCaseReportValidateReducer,
  clinicalResearchFailedMeasures: clinicalResearchFailedMeasuresReducer,
  clinicalResearchInfluencingFactor: clinicalResearchInfluencingFactorReducer,
  damageType: damageTypeReducer,
  deviceType: deviceTypeReducer,
  deviceCaseReport: deviceCaseReportReducer,
  event: eventReducer,
  eventType: eventTypeReducer,
  failedMeasure: failedMeasureReducer,
  fluidType: fluidTypeReducer,
  InfluencingFactor: InfluencingFactorReducer,
  log: logReducer,
  medicineCaseReport: medicineCaseReportReducer,
  movementReport: movementReportReducer,
  observationReturnCase: observationReturnCaseReducer,
  origin: originReducer,
  patient: patientReducer,
  position: positionReducer,
  priority: priorityReducer,
  protocol: protocolReducer,
  reasonReturnCase: reasonReturnCaseReducer,
  reportAnalistAssignment: reportAnalistAssignmentReducer,
  reportResearcherAssignment: reportResearcherAssignmentReducer,
  researchInstrument: researchInstrumentReducer,
  riskFactor: riskFactorReducer,
  riskLevel: riskLevelReducer,
  riskType: riskTypeReducer,
  role: roleSReducer,
  roleReponsteTyme: roleResponseTimeReducer,
  safetyBarrier: safetyBarrierReducer,
  service: serviceReducer,
  severityClasification: severityClasificationReducer,
  subOrigin: subOriginReducer,
  unit: unitReducer,
  unsafeAction: unsafeActionReducer,
  compressionConceptReport: compressionConceptReportReducer,
  changeOfCaseType: changeOfCaseTypeReducer,
  oncologyCategory: oncologyCategoryReducer,
  itemMenuSelectedKey: itemMenuSelectedKeyReducer,

  [unitApi.reducerPath]: unitApi.reducer,
  [caseTypeApi.reducerPath]: caseTypeApi.reducer,
  [riskTypeApi.reducerPath]: riskTypeApi.reducer,
  [severityClasificationApi.reducerPath]: severityClasificationApi.reducer,
  [originApi.reducerPath]: originApi.reducer,
  [riskLevelApi.reducerPath]: riskLevelApi.reducer,
  [characterizationCaseApi.reducerPath]: characterizationCaseApi.reducer,
  [roleApi.reducerPath]: roleApi.reducer,
  [researchInstrumentApi.reducerPath]: researchInstrumentApi.reducer,
  [deviceTypeApi.reducerPath]: deviceTypeApi.reducer,
  [damageTypeApi.reducerPath]: damageTypeApi.reducer,
  [fluidTypeApi.reducerPath]: fluidTypeApi.reducer,
  [influencingFactorApi.reducerPath]: influencingFactorApi.reducer,
  [failedMeasureApi.reducerPath]: failedMeasureApi.reducer,
  [safetyBarrierApi.reducerPath]: safetyBarrierApi.reducer,
  [riskFactorApi.reducerPath]: riskFactorApi.reducer,
  [protocolApi.reducerPath]: protocolApi.reducer,
  [unsafeActionApi.reducerPath]: unsafeActionApi.reducer,
  [movementReportApi.reducerPath]: movementReportApi.reducer,
  [serviceApi.reducerPath]: serviceApi.reducer,
  [subOriginApi.reducerPath]: subOriginApi.reducer,
  [priorityApi.reducerPath]: priorityApi.reducer,
  [reasonReturnCaseApi.reducerPath]: reasonReturnCaseApi.reducer,
  [eventTypeApi.reducerPath]: eventTypeApi.reducer,
  [eventApi.reducerPath]: eventApi.reducer,
  [compressionConceptReportApi.reducerPath]:
    compressionConceptReportApi.reducer,
  [oncologyCategoryApi.reducerPath]: oncologyCategoryApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat([
      unitApi.middleware,
      caseTypeApi.middleware,
      riskTypeApi.middleware,
      severityClasificationApi.middleware,
      originApi.middleware,
      riskLevelApi.middleware,
      characterizationCaseApi.middleware,
      roleApi.middleware,
      researchInstrumentApi.middleware,
      deviceTypeApi.middleware,
      damageTypeApi.middleware,
      fluidTypeApi.middleware,
      influencingFactorApi.middleware,
      failedMeasureApi.middleware,
      safetyBarrierApi.middleware,
      riskFactorApi.middleware,
      protocolApi.middleware,
      unsafeActionApi.middleware,
      movementReportApi.middleware,
      serviceApi.middleware,
      subOriginApi.middleware,
      priorityApi.middleware,
      reasonReturnCaseApi.middleware,
      eventTypeApi.middleware,
      eventApi.middleware,
      compressionConceptReportApi.middleware,
      oncologyCategoryApi.middleware,
    ]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
