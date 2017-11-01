export interface sensorStatus {
    instrument_status_id: number;
    status_type_id: number;
    status?: string;
    instrument_id: number;
    time_stamp?: Date;
    time_zone?: string;
    notes?: string;
    member_id: number;
    deployer?: string;
    retriever?: string;
    sensor_elevation?: number;
    ws_elevation?: number;
    gs_elevation?: number;
    vdatum_id?: number;
    vdatum?: string;
}