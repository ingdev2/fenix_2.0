import { createSlice } from "@reduxjs/toolkit";

const initialState: ActionPlanActivity = {
  id: 0,
  plan_aa_actionplan_id_fk: 0,
  plan_aa_nameincharge: "",
  plan_aa_userincharge_id: "",
  plan_aa_position_id_fk: 0,
  plan_aa_executiondate: "",
  plan_aa_descriptionactivity: "",
  plan_aa_implementationplan: "",
  plan_aa_status: true,
  createdAt: "",
  updateAt: "",
  deletedAt: "",
};

export const actionPlanActivitySlice = createSlice({
  name: "actionPlanActivity",
  initialState,
  reducers: {
    setIdActionPlanActivity: (state, action) => {
      state.id = action.payload;
    },
    setActionPlanIdFk: (state, action) => {
      state.plan_aa_actionplan_id_fk = action.payload;
    },
    setNameInchargeActionPlanActivity: (state, action) => {
      state.plan_aa_nameincharge = action.payload;
    },
    setUserInchargeIdActionPlanActivity: (state, action) => {
      state.plan_aa_userincharge_id = action.payload;
    },
    setPositionIdFk: (state, action) => {
      state.plan_aa_position_id_fk = action.payload;
    },
    setExecutionDateActionPlanActivity: (state, action) => {
      state.plan_aa_executiondate = action.payload;
    },
    setDescriptionActionPlanActivity: (state, action) => {
      state.plan_aa_descriptionactivity = action.payload;
    },
    setImplementationActionPlanActivity: (state, action) => {
      state.plan_aa_implementationplan = action.payload;
    },
    setStatusActionPlanActivity: (state, action) => {
        state.plan_aa_status = action.payload;
      },
    setCreateDateActionPlanActivity: (state, action) => {
      state.createdAt = action.payload;
    },
    setUpdateDateActionPlanActivity: (state, action) => {
      state.updateAt = action.payload;
    },
    setDeleteDateActionPlanActivity: (state, action) => {
      state.deletedAt = action.payload;
    },
    setDefaultValuesActionPlanActivity: (state) => {
      state.id = 0;
      state.plan_aa_actionplan_id_fk = 0;
      state.plan_aa_nameincharge = "";
      state.plan_aa_userincharge_id = "";
      state.plan_aa_position_id_fk = 0;
      state.plan_aa_executiondate = "";
      state.plan_aa_descriptionactivity = "";
      state.plan_aa_implementationplan = "";
      state.plan_aa_status = true;
      state.createdAt = "";
      state.updateAt = "";
      state.deletedAt = "";
    },
  },
});

export const {
  setIdActionPlanActivity,
  setActionPlanIdFk,
  setNameInchargeActionPlanActivity,
  setUserInchargeIdActionPlanActivity,
  setPositionIdFk,
  setExecutionDateActionPlanActivity,
  setDescriptionActionPlanActivity,
  setImplementationActionPlanActivity,
  setStatusActionPlanActivity,
  setCreateDateActionPlanActivity,
  setUpdateDateActionPlanActivity,
  setDeleteDateActionPlanActivity,
  setDefaultValuesActionPlanActivity,
} = actionPlanActivitySlice.actions;

export default actionPlanActivitySlice.reducer;
