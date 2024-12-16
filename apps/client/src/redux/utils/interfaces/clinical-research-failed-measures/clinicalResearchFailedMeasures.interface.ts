interface clinicalResearchFailedMeasures {
  id: number;
  meas_fcr_clinicalresearch_id_fk: string;
  meas_fcr_failedmeasure_id_fk: number;
  meas_fcr_status: boolean;
  createdAt: string;
  updateAt: string;
  deletedAt: string | null;
}
