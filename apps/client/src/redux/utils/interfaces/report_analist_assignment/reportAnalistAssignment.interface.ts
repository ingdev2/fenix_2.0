interface ReportAnalistAssignment {
  id: number;
  ana_validatedcase_id_fk: string;
  ana_position_id_fk: number;
  ana_useranalyst_id: string;
  ana_uservalidator_id: string;
  ana_days: number;
  ana_amountreturns: number;
  ana_isreturned: boolean;
  ana_justifications: string | null;
  ana_status: boolean;
  createdAt: string;
  updateAt: string;
  deletedAt: string | null;
}
