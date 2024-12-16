interface Event {
  id: number;
  eve_eventtype_id_fk: number;
  eve_unit_id_fk: number | null;
  eve_name: string;
  eve_description: string;
  eve_status: boolean;
  createdAt: string; 
  updateAt: string; 
  deletedAt: string | null; 
  eventType: EventType;
  unit: Unit ;
}
