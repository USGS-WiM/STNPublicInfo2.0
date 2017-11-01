export interface opMeasure {
    op_measurements_id: number;
    op_name?:string;
    objective_point_id: number;
    instrument_status_id: number;
    water_surface?: number;
    ground_surface?: number;
    offset_correction?: number;
    OPVdatum?: string;
    elevation?: string;
}