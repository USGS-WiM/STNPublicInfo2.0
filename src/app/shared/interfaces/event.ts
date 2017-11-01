export interface event {
    event_id: number;
    event_name?: string;
    event_start_date?: Date;
    event_end_date?: Date;
    event_description?: string;
    event_type_id?: number;
    event_status_id?: number;
    event_coordinator?: number;
}