import { createSlice } from "@reduxjs/toolkit";

const initialState: ActionPlan = {
  id: 0,
  plan_a_name: "",
  plan_a_description: "",
  plan_a_userresponsible_id: "",
  plan_a_nameresponsible: "",
  plan_a_position_id_fk: 0,
  plan_a_casetype_id_fk: 0,
  plan_a_eventtype_id_fk: 0,
  plan_a_event_id_fk: 0,
  plan_a_service_id_fk: 0,
  plan_a_unit_id_fk: 0,
  plan_a_priority_id_fk: 0,
  plan_a_rootcause: "",
  plan_a_whydescription: "",
  plan_a_closingdate: "",
  plan_a_status: true,
  createdAt: "",
  updateAt: "",
  deletedAt: "",
};

export const actionPlanSlice = createSlice({
  name: "actionPlan",
  initialState,
  reducers: {
    setIdActionPlan: (state, action) => {
      state.id = action.payload;
    },
    setNameActionPlan: (state, action) => {
      state.plan_a_name = action.payload;
    },
    setDescriptionActionPlan: (state, action) => {
      state.plan_a_description = action.payload;
    },
    setUserResponsibleIdActionPlan: (state, action) => {
      state.plan_a_userresponsible_id = action.payload;
    },
    setNameResponsibleActionPlan: (state, action) => {
      state.plan_a_nameresponsible = action.payload;
    },
    setPositionIdFk: (state, action) => {
      state.plan_a_position_id_fk = action.payload;
    },
    setCasetypeIdFk: (state, action) => {
      state.plan_a_casetype_id_fk = action.payload;
    },
    setEventTypeIdFk: (state, action) => {
      state.plan_a_eventtype_id_fk = action.payload;
    },
    setEventIdFk: (state, action) => {
      state.plan_a_event_id_fk = action.payload;
    },
    setServiceIdFk: (state, action) => {
      state.plan_a_service_id_fk = action.payload;
    },
    setUnitIdFk: (state, action) => {
      state.plan_a_unit_id_fk = action.payload;
    },
    setPriorityIdFk: (state, action) => {
      state.plan_a_priority_id_fk = action.payload;
    },
    setRootCause: (state, action) => {
      state.plan_a_rootcause = action.payload;
    },
    setWhyDescription: (state, action) => {
      state.plan_a_whydescription = action.payload;
    },
    setClosingDateActionPlan: (state, action) => {
      state.plan_a_closingdate = action.payload;
    },
    setStatusActionPlan: (state, action) => {
      state.plan_a_status = action.payload;
    },
    setCreateDateActionPlan: (state, action) => {
      state.createdAt = action.payload;
    },
    setUpdateDateActionPlan: (state, action) => {
      state.updateAt = action.payload;
    },
    setDeleteDateActionPlan: (state, action) => {
      state.deletedAt = action.payload;
    },
    setDefaultValuesActionPlan: (state) => {
      state.id = 0;
      state.plan_a_name = "";
      state.plan_a_description = "";
      state.plan_a_userresponsible_id = "";
      state.plan_a_nameresponsible = "";
      state.plan_a_position_id_fk = 0;
      state.plan_a_casetype_id_fk = 0;
      state.plan_a_eventtype_id_fk = 0;
      state.plan_a_event_id_fk = 0;
      state.plan_a_service_id_fk = 0;
      state.plan_a_unit_id_fk = 0;
      state.plan_a_priority_id_fk = 0;
      state.plan_a_rootcause = "";
      state.plan_a_whydescription = "";
      state.plan_a_closingdate = "";
      state.plan_a_status = true;
      state.createdAt = "";
      state.updateAt = "";
      state.deletedAt = "";
    },
  },
});

export const {
  setIdActionPlan,
  setNameActionPlan,
  setDescriptionActionPlan,
  setUserResponsibleIdActionPlan,
  setNameResponsibleActionPlan,
  setPositionIdFk,
  setCasetypeIdFk,
  setEventTypeIdFk,
  setEventIdFk,
  setServiceIdFk,
  setUnitIdFk,
  setPriorityIdFk,
  setRootCause,
  setWhyDescription,
  setClosingDateActionPlan,
  setStatusActionPlan,
  setCreateDateActionPlan,
  setUpdateDateActionPlan,
  setDeleteDateActionPlan,
  setDefaultValuesActionPlan,
} = actionPlanSlice.actions;

export default actionPlanSlice.reducer;
