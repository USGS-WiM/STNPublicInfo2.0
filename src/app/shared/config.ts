import {Injectable} from "@angular/core";
import {Headers}    from "@angular/http";

@Injectable()
export class CONFIG {
    private static baseURL: string = "https://stn.wim.usgs.gov/STNServices/"; 

    public static get HORIZONTAL_DATUMS_URL(): string { return this.baseURL + "HorizontalDatums"};
    public static get EVENTS_URL(): string { return this.baseURL + "Events"};
    public static get HORIZONTAL_COLLECT_URL(): string { return this.baseURL + "HorizontalMethods"};
    public static get VERTICAL_COLLECT_URL(): string { return this.baseURL + "VerticalMethods"};
    public static get VERTICAL_DATUMS_URL(): string { return this.baseURL + "VerticalDatums"};
    public static get AGENCIES_URL(): string { return this.baseURL + "Agencies"};
    public static get HWM_TYPES_URL(): string { return this.baseURL + "HWMTypes"};
    public static get MARKERS_URL(): string { return this.baseURL + "Markers"};
    public static get HWM_QUALITIES_URL(): string { return this.baseURL + "HWMQualities"};
    public static get SITE_URL(): string { return this.baseURL + "Sites"};    
    public static get HWM_URL(): string { return this.baseURL + "HWMS"};
    public static get MEMBER_URL(): string { return this.baseURL + "Members"};
    public static get SOURCE_URL(): string { return this.baseURL + "Sources"};
    public static get SENSOR_URL(): string { return this.baseURL + "Instruments"};
    public static get SENSOR_TYPES_URL(): string { return this.baseURL + "SensorTypes"};
    public static get SENSOR_STATUS_URL(): string {return this.baseURL + "InstrumentStatus"}
    // headers
    public static get MIN_JSON_HEADERS() { return new Headers({ "Accept": "application/json" }); };
    public static get JSON_HEADERS() { return new Headers({ "Accept": "application/json", "Content-Type": "application/json" }); };
    public static get JSON_AUTH_HEADERS() { return new Headers({"Accept": "application/json", "Content-Type": "application/json", "Authorization": localStorage.getItem("creds")}); };

}