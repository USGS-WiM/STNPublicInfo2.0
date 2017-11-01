import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable }   from 'rxjs/Observable';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Site } from './interfaces/site';
import { horizontalDatum } from './interfaces/horitzontalDatum';
import { event } from './interfaces/event';
import { horizontalCollectMethod } from './interfaces/horizontalCollect';
import { verticalCollectMethod } from './interfaces/verticalCollect';
import { verticalDatum } from './interfaces/verticalDatum';
import { agency } from './interfaces/agency';
import { CONFIG } from './config';
import { hwmType } from './interfaces/hwmType';
import { marker } from './interfaces/marker';
import { hwmQuality } from './interfaces/hwmQuality';
import { Peak } from './interfaces/peak';
import { hwm } from './interfaces/hwm';
import { file } from './interfaces/file';
import { Source } from './interfaces/source';
import { Router } from '@angular/router';
import { sensor } from './interfaces/sensor';
import { sensorType } from './interfaces/sensorType';
import { opMeasure } from './interfaces/opMeasure';
import { datumLocation } from './interfaces/datumLocation';

//interfaces

@Injectable()
export class STNService {
    options: any;
    //SUBJECTS
    private _hDatums: BehaviorSubject<Array<horizontalDatum>> = <BehaviorSubject<horizontalDatum[]>>new BehaviorSubject([]);
    private _events: BehaviorSubject<Array<event>> = <BehaviorSubject<event[]>>new BehaviorSubject([]);
    private _hCollectMethods: BehaviorSubject<Array<horizontalCollectMethod>> = <BehaviorSubject<horizontalCollectMethod[]>>new BehaviorSubject([]);
    private _vCollectMethods: BehaviorSubject<Array<verticalCollectMethod>> = <BehaviorSubject<verticalCollectMethod[]>>new BehaviorSubject([]);
    private _vDatums: BehaviorSubject<Array<verticalDatum>> = <BehaviorSubject<verticalDatum[]>>new BehaviorSubject([]);
    private _agencies: BehaviorSubject<Array<agency>> = <BehaviorSubject<agency[]>>new BehaviorSubject([]);
    private _hwmTypes: BehaviorSubject<Array<hwmType>> = <BehaviorSubject<hwmType[]>>new BehaviorSubject([]);
    private _markers: BehaviorSubject<Array<marker>> = <BehaviorSubject<marker[]>>new BehaviorSubject([]);
    private _hwmQualities: BehaviorSubject<Array<hwmQuality>> = <BehaviorSubject<hwmQuality[]>>new BehaviorSubject([]);   
    
    //GETTERS
    public getHDatums(): Observable<Array<horizontalDatum>> { return this._hDatums.asObservable(); }
    public getEvents(): Observable<Array<event>> { return this._events.asObservable(); }
    public getHCollectMethods(): Observable<Array<horizontalCollectMethod>> { return this._hCollectMethods.asObservable(); }
    public getVCollectMethods(): Observable<Array<verticalCollectMethod>> { return this._vCollectMethods.asObservable(); }
    public getVDatums(): Observable<Array<verticalDatum>> { return this._vDatums.asObservable(); }
    public getAgencies(): Observable<Array<agency>> { return this._agencies.asObservable(); }
    public getHWMTypes(): Observable<Array<hwmType>> { return this._hwmTypes.asObservable(); }
    public getMarkers(): Observable<Array<marker>> { return this._markers.asObservable(); }
    public getHWMQualities(): Observable<Array<hwmQuality>> { return this._hwmQualities.asObservable(); }
    
    //SETTERS
    public setHDatums(hd: Array<horizontalDatum>){this._hDatums.next(hd);}
    public setEvents(e: Array<event>){this._events.next(e);}
    public setHCollectMethods(hcm: Array<horizontalCollectMethod>){this._hCollectMethods.next(hcm);}
    public setVCollectMethods(vcm: Array<verticalCollectMethod>){this._vCollectMethods.next(vcm);}
    public setVDatums(vd: Array<verticalDatum>){this._vDatums.next(vd);}
    public setAgencies(a: Array<agency>){this._agencies.next(a);}
    public setHWMTypes(h: Array<hwmType>){this._hwmTypes.next(h);}    
    public setMarkers(m: Array<marker>){this._markers.next(m);}
    public setHWMQualities(hq: Array<hwmQuality>){this._hwmQualities.next(hq);}   
    
    constructor(private _http: Http, private _router:Router){
        // get things both pages would need up front and store in BehaviorSubjects
        // thisSite, sitePeaks, hDatumList, events, hCMethods, vCMethods, vDatums, agencies
        this.options = new RequestOptions({headers: CONFIG.JSON_AUTH_HEADERS});
        this.getTheBasics();
    }
    
    // go get the things both pages need and store it for grabbing
    private getTheBasics(){
        this.getAllHorizontalDatums();
        this.getAllEvents();
        this.getAllHorizontalCollectMethods();
        this.getAllVerticalCollectMethods();
        this.getAllVerticalDatums();
        this.getAllAgencies();
        this.getAllHWMTypes();
        this.getAllMarkers();
        this.getAllHwmQualities();
    }

    public getAllHorizontalDatums(){        
        this._http.get(CONFIG.HORIZONTAL_DATUMS_URL, this.options)
        .map(h => <Array<horizontalDatum>>h.json())
        .subscribe(hd => {this.setHDatums(hd); });
    }
    public getAllEvents(){
        this._http.get(CONFIG.EVENTS_URL, this.options)
        .map(e => <Array<event>>e.json())
        .subscribe(ev => {this.setEvents(ev); });
    }
    public getAllHorizontalCollectMethods(){
        this._http.get(CONFIG.HORIZONTAL_COLLECT_URL, this.options)
        .map(h => <Array<horizontalCollectMethod>>h.json())
        .subscribe(hc => {this.setHCollectMethods(hc); });
    }
    public getAllVerticalCollectMethods(){
        this._http.get(CONFIG.VERTICAL_COLLECT_URL, this.options)
        .map(v => <Array<verticalCollectMethod>>v.json())
        .subscribe(vc => {this.setVCollectMethods(vc); });
    }
    public getAllVerticalDatums(){
        this._http.get(CONFIG.VERTICAL_DATUMS_URL, this.options)
        .map(v => <Array<verticalDatum>>v.json())
        .subscribe(vd => {this.setVDatums(vd); });
    }
    public getAllAgencies(){
        this._http.get(CONFIG.AGENCIES_URL, this.options)
        .map(a => <Array<agency>>a.json())
        .subscribe(ag => {this.setAgencies(ag); });
    }
    public getAllHWMTypes(){        
        this._http.get(CONFIG.HWM_TYPES_URL, this.options)
        .map(h => <Array<hwmType>>h.json())
        .subscribe(ht => {this.setHWMTypes(ht); });
    }
    public getAllMarkers(){
        this._http.get(CONFIG.MARKERS_URL, this.options)
        .map(m => <Array<marker>>m.json())
        .subscribe(m => {this.setMarkers(m); });
    }
    public getAllHwmQualities(){        
        this._http.get(CONFIG.HWM_QUALITIES_URL, this.options)
        .map(h => <Array<hwmQuality>>h.json())
        .subscribe(hq => {this.setHWMQualities(hq); });
    }
    //RESOLVE GETTERS
    public getSite(id: number): Observable<Site> {
        return this._http.get(CONFIG.SITE_URL + '/' + id, this.options)
        .map(s => <Site>s.json())
        .catch((e) => {
            this._router.navigate(['/error', {error:'Site'}]);
            return Observable.throw(
              new Error(`${ e.status } ${ e.statusText }`)
            );
        });
    }
    public getSitePeaks(id: number): Observable<Array<Peak>>{
        return this._http.get(CONFIG.SITE_URL + '/' + id + '/PeakSummaryView', this.options)
        .map(p => <Array<Peak>>p.json())
        .catch(this.handleError);
    }

    public getSensor(id: number): Observable<sensor> {
        return this._http.get(CONFIG.SENSOR_URL + '/' + id + '/FullInstrument', this.options)
        .map(s => <sensor>s.json())
        .catch((e) => {
            this._router.navigate(['/error', {error:'Sensor'}]);
            return Observable.throw(
              new Error(`${ e.status } ${ e.statusText }`)
            );
        });
    }

    public getHWM(id: number): Observable<hwm> {
        return this._http.get(CONFIG.HWM_URL + '/' + id, this.options)
        .map(h => <hwm>h.json())
        .catch((e) => {
            this._router.navigate(['/error', {error:'HWM'}]);
            return Observable.throw(
              new Error(`${ e.status } ${ e.statusText }`)
            );
        });
    }
    public getHWMFiles(id: number):Observable<Array<file>>{
        return this._http.get(CONFIG.HWM_URL + '/' + id + '/Files', this.options)
        .map(hf => <Array<file>>hf.json())
        .catch(this.handleError);
    }
    public getSensorFiles(id: number):Observable<Array<file>>{
        return this._http.get(CONFIG.SENSOR_URL + '/' + id + '/Files', this.options)
        .map(hf => <Array<file>>hf.json())
        .catch(this.handleError);
    }
    public getSiteOPs(id: number):Observable<Array<datumLocation>>{
        return this._http.get(CONFIG.SITE_URL + '/' + id + '/ObjectivePoints', this.options)
        .map(hf => <Array<datumLocation>>hf.json())
        .catch(this.handleError);
    }
    //HWM.COMPONENT GETS
    public getMemberName(id:number):Observable<string>{
        return this._http.get(CONFIG.MEMBER_URL + '/GetMemberName/' + id, this.options)
        .map(m => <string>m.json())
        .catch(this.handleError);
    }
    public getSource(id:number):Observable<Source> {
        return this._http.get(CONFIG.SOURCE_URL + '/' + id, this.options)
        .map(s => <Source>s.json())
        .catch(this.handleError);
    }

    // SENSOR.COMPONENT GETS
    public getInstStatOPMeasures(id:number):Observable<Array<opMeasure>> {
        return this._http.get(CONFIG.SENSOR_STATUS_URL + '/' + id + '/OPMeasurements', this.options)
        .map(s => <Array<opMeasure>>s.json())
        .catch(this.handleError);
    }

    //ERROR HANDLING
    private handleError(error: any) {        
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        return Observable.throw(errMsg);
    }    
}