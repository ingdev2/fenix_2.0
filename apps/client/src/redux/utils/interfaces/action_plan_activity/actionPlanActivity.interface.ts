interface ActionPlanActivity {
  id: number;
  plan_aa_actionplan_id_fk: number;
  plan_aa_nameincharge: string;
  plan_aa_userincharge_id: string;
  plan_aa_position_id_fk: number;
  plan_aa_executiondate: string;
  plan_aa_descriptionactivity: string;
  plan_aa_implementationplan: string;
  plan_aa_status: boolean;
  createdAt: string;
  updateAt: string;
  deletedAt: string | null;
}
