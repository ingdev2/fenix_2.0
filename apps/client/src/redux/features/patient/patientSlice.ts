import { createSlice } from "@reduxjs/toolkit";

const initialState: Patient = {
  NOMBRE: "",
  ID: "",
  TIPO: "",
  SEXO: "",
  CORREO: "",
  DIRECCION: "",
  EMPRESA: "",
  TELEFONO: "",
  CELULAR: "",
  NIVEL_EDUCATIVO: "",
  FECHA_NACIMIENTO: "",
};

export const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    setNamePatient: (state, action) => {
      state.NOMBRE = action.payload;
    },
    setIdPatient: (state, action) => {
      state.ID = action.payload;
    },
    setTypeIdPatient: (state, action) => {
      state.TIPO = action.payload;
    },
    setGenderPatient: (state, action) => {
      state.SEXO = action.payload;
    },
    setEmailPatient: (state, action) => {
      state.CORREO = action.payload;
    },
    setAddressPatient: (state, action) => {
      state.DIRECCION = action.payload;
    },
    setCompanyPatient: (state, action) => {
      state.EMPRESA = action.payload;
    },
    setTelephonePatient: (state, action) => {
      state.TELEFONO = action.payload;
    },
    setCellphonePatient: (state, action) => {
      state.CELULAR = action.payload;
    },
    setEducationalLevelPatient: (state, action) => {
      state.NIVEL_EDUCATIVO = action.payload;
    },
    setBirthdatePatient: (state, action) => {
      state.FECHA_NACIMIENTO = action.payload;
    },
    setDefaultValuesPatient: (state) => {
      state.NOMBRE = "";
      state.ID = "";
      state.TIPO = "";
      state.SEXO = "";
      state.CORREO = "";
      state.DIRECCION = "";
      state.EMPRESA = "";
      state.TELEFONO = "";
      state.CELULAR = "";
      state.NIVEL_EDUCATIVO = "";
      state.FECHA_NACIMIENTO = "";
    },
  },
});

export const {
  setNamePatient,
  setIdPatient,
  setTypeIdPatient,
  setGenderPatient,
  setEmailPatient,
  setAddressPatient,
  setCompanyPatient,
  setTelephonePatient,
  setCellphonePatient,
  setDefaultValuesPatient,
} = patientSlice.actions;

export default patientSlice.reducer;
