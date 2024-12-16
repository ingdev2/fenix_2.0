interface Events {
  id: number;
  eve_eventtype_id_fk: number;
  eve_unit_id_fk: number | null;
  eve_oncologycategory_id_fk: number;
  eve_characterizationcase_id_fk: number | null;
  eve_name: string;
  eve_status: boolean;
  createdAt: string;
  updateAt: string;
  deletedAt: string | null;
}
