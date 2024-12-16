interface ActionPlan {
  id: number;
  plan_a_name: string;
  plan_a_description: string;
  plan_a_userresponsible_id: string;
  plan_a_nameresponsible: string;
  plan_a_position_id_fk: number;
  plan_a_casetype_id_fk: number;
  plan_a_eventtype_id_fk: number;
  plan_a_event_id_fk: number;
  plan_a_service_id_fk: number;
  plan_a_unit_id_fk: number;
  plan_a_priority_id_fk: number;
  plan_a_rootcause: string;
  plan_a_whydescription: string;
  plan_a_closingdate: string;
  plan_a_status: boolean;
  createdAt: string;
  updateAt: string;
  deletedAt: string | null;
}
