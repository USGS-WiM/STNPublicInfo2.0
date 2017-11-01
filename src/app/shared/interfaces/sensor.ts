import {sensorStatus} from './sensorStatus';

export interface sensor {
    instrument_id: number;
    sensor_type_id: number;
    sensorType?: string;
    deployment_type_id?: number;
    deploymentType?: string;
    serial_number?: string;
    housing_serial_number?: string;
    interval?: number;
    site_id: number;
    event_id: number;
    eventName?: string;
    location_description?: string
    inst_collection_id?: number;
    instCollection?: string;
    housing_type_id?: number;
    housingType?: string;
    vented?: string;
    sensor_brand_id?: number;
    sensorBrand?: string;
    instrument_status: Array<sensorStatus>;
}