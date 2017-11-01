export interface datumLocation {
    objective_point_id: number;
    name?: string;
    description?: string;
    elev_ft?: number;
    date_established?: Date;
    op_is_destroyed?: number;
    op_notes?: string;
    site_id?: number;
    vdatum_id?: number;
    latitude_dd?: number;
    longitude_dd?: number;
    hdatum_id?: number;
    hcollect_method_id?: number;
    vcollect_method_id?: number;
    op_type_id: number;
    date_recovered?: Date;
    uncertainty?: number;
    unquantified?: string;
    op_quality_id?: number;    
}