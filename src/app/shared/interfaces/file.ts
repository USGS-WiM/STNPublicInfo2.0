import { Source } from "./source";

export interface file {
    file_id: number;
    name?: string;
    description?: string;
    photo_direction?: string;
    latitude_dd?: number;
    longitude_dd?: number;
    file_date?: Date;
    hwm_id?: number;
    site_id?: number;
    filetype_id?: number;
    source_id?: number;
    path?: string;
    data_file_id?: number;
    instrument_id?: number;
    photo_date?: Date;
    is_nwis?: number;
    objective_point_id?: number;
    source?: Source;
}