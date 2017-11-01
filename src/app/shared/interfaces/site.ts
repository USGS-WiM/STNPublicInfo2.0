export interface Site {
    site_id: number;
    site_no?: string;
    site_name?: string;    
    site_description?: string;
    address?: string;
    city?: string;
    state?: string;
    zip?: string;
    other_sid?: string;
    county?: string;
    waterbody: string;
    latitude_dd: number;
    longitude_dd: number;
    hdatum_id: number;
    HorizontalDatum?: string;
    drainage_area_sqmi?: number;
    landownercontact_id?: number;
    priority_id?: number;
    zone?: string;
    is_permanent_housing_installed?: string;
    usgs_sid?: string;
    noaa_sid?: string;
    hcollect_method_id?: number;
    HorizontalCollectMethod?: string;
    site_notes?: string;
    safety_notes?: string;
    access_granted?: string;
    member_id?: number;
    sensor_not_appropriate?: number;
    
}
