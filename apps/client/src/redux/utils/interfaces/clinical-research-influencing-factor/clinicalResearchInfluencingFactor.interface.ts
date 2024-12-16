interface ClinicalResearchInfluencingFactor {
  id: number;
  inf_fcr_clinicalresearch_id_fk: string;
  inf_fcr_influencingfactor_id_fk: number;
  inf_fcr_status: boolean;
  createdAt: string;
  updateAt: string;
  deletedAt: string | null;
}
