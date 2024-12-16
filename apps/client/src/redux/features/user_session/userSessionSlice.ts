import { IUserSession } from "@/utils/interfaces/auth/user.interface";
import { createSlice } from "@reduxjs/toolkit";

const initialState: IUserSession = {
  id: "",
  name: "",
  user_id_type: 0,
  id_number: "",
  principal_email: "",
  role: [],
  permissions: [],
};

export const userSessionSlice = createSlice({
  name: "userSession",
  initialState,
  reducers: {
    setIdUserSession: (state, action) => {
      state.id = action.payload;
    },
    setNameUserSession: (state, action) => {
      state.name = action.payload;
    },
    setUserIdTypeUserSession: (state, action) => {
      state.user_id_type = action.payload;
    },
    setIdNumberUserSession: (state, action) => {
      state.id_number = action.payload;
    },
    setPrincipalEmailUserSession: (state, action) => {
      state.principal_email = action.payload;
    },
    setRoleUserSession: (state, action) => {
      state.role = action.payload;
    },
    setPermissionsUserSession: (state, action) => {
      state.permissions = action.payload;
    },
    setDefaultValuesUserSession: (state) => {
      state.id = "";
      state.name = "";
      state.user_id_type = 0;
      state.id_number = "";
      state.principal_email = "";
      state.role = [];
      state.permissions = [];
    },
  },
});

export const {
  setIdUserSession,
  setNameUserSession,
  setUserIdTypeUserSession,
  setIdNumberUserSession,
  setPrincipalEmailUserSession,
  setRoleUserSession,
  setPermissionsUserSession,
  setDefaultValuesUserSession,
} = userSessionSlice.actions;

export default userSessionSlice.reducer;
