export enum caseTypeReport {
  RISK = "RIESGO",
  ADVERSE_EVENT = "EVENTO ADVERSO",
  INCIDENT = "INCIDENTE",
  INDICATING_UNSAFE_CARE = "INDICIO DE ATENCIÓN INSEGURA",
  COMPLICATIONS = "COMPLICACIONES",
}

export const getColorByCaseType = (type: string) => {
  switch (type) {
    case caseTypeReport.RISK.toUpperCase():
      return "geekblue";
    case caseTypeReport.ADVERSE_EVENT.toUpperCase():
      return "green";
    case caseTypeReport.INCIDENT.toUpperCase():
      return "yellow";
    case caseTypeReport.INDICATING_UNSAFE_CARE.toUpperCase():
      return "volcano";
    case caseTypeReport.COMPLICATIONS.toUpperCase():
      return "red";
    default:
      return "black";
  }
};
