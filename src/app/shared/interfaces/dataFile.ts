export interface dataFile {
    data_file_id: number;
    start?: Date;
    end?: Date;
    good_start?: Date;
    good_end?: Date;
    processor_id?: number;
    instrument_id?: number;
    approval_id?: number;
    collect_date?: Date;
    peak_summary_id?: number;
    elevation_status?: string;
    time_zone?: string;
}