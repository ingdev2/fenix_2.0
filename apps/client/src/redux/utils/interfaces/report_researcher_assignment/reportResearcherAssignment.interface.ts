interface ReportResearcherAssignment {
    id: number;
    res_validatedcase_id_fk: string;
    res_useranalyst_id: string;
    res_userresearch_id: string;
    res_days: number;
    res_isreturned: boolean;
    res_status: boolean;
    createdAt: string;
    updateAt: string;
    deletedAt: string | null;
  }
  