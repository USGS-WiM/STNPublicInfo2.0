// ------------------------------------------------------------------------------
// ----- hwm.component ------------------------------------------------
// ------------------------------------------------------------------------------
// copyright:   2017 WiM - USGS
// authors:  Tonia Roddick USGS Wisconsin Internet Mapping
// purpose: Site, Peaks, Files, HWM view

import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { STNService } from '../shared/app.services';
import { horizontalDatum } from '../shared/interfaces/horitzontalDatum';
import { event } from '../shared/interfaces/event';
import { horizontalCollectMethod } from '../shared/interfaces/horizontalCollect';
import { verticalCollectMethod } from '../shared/interfaces/verticalCollect';
import { agency } from '../shared/interfaces/agency';
import { hwmType } from '../shared/interfaces/hwmType';
import { marker } from '../shared/interfaces/marker';
import { hwmQuality } from '../shared/interfaces/hwmQuality';
import { Site } from '../shared/interfaces/site';
import { Peak } from '../shared/interfaces/peak';
import { hwm } from '../shared/interfaces/hwm';
import { verticalDatum } from '../shared/interfaces/verticalDatum';
import { file } from '../shared/interfaces/file';
import { dataFile } from '../shared/interfaces/dataFile';
import { Source } from '../shared/interfaces/source';

@Component({
    templateUrl: "hwm.component.html",
    styleUrls: ['./hwm.component.css']
})

export class HWMviewComponent{
    public baseURL: string = "https://stn.wim.usgs.gov/STNServices/"; 
    public aSite: Site;
    public peaks: Array<Peak>;
    public aHWM: hwm;
    public HWMFiles: Array<file>;
    public imageFiles: Array<file>;
    public horizontalDatums: Array<horizontalDatum>;
    public verticalDatums: Array<verticalDatum>;
    public events: Array<event>;
    public horizontalCollectMethods: Array<horizontalCollectMethod>;
    public verticalCollectMethods: Array<verticalCollectMethod>;
    public agencies: Array<agency>;
    public hwmTypes: Array<hwmType>;
    public markers: Array<marker>;
    public hwmQualities: Array<hwmQuality>;
    public NotFound: boolean;
    public NoFiles: boolean;

    constructor(private _route: ActivatedRoute, private _STNServices: STNService){ }

    ngOnInit(){
        this.NotFound = false; this.NoFiles = false;
        this._STNServices.getHDatums().subscribe((hd: Array<horizontalDatum>) => {
            this.horizontalDatums = hd;
        })
        this._STNServices.getVDatums().subscribe((vd: Array<verticalDatum>) => {
            this.verticalDatums = vd;
        })
        this._STNServices.getEvents().subscribe((e: Array<event>) => {
            this.events = e;
        })
        this._STNServices.getVCollectMethods().subscribe((vc: Array<verticalCollectMethod>) => {
            this.verticalCollectMethods = vc;
        })
        this._STNServices.getHCollectMethods().subscribe((hc: Array<horizontalCollectMethod>) => {
            this.horizontalCollectMethods = hc;
        })
        this._STNServices.getAgencies().subscribe((a: Array<agency>) => {
            this.agencies = a;
        })
        this._STNServices.getHWMTypes().subscribe((h: Array<hwmType>) => {
            this.hwmTypes = h;
        })
        this._STNServices.getMarkers().subscribe((m: Array<marker>) => {
            this.markers = m;
        })
        this._STNServices.getHWMQualities().subscribe((hq: Array<hwmQuality>) => {
            this.hwmQualities = hq;
        })

        // route data resolve must send 'thisSite', 'sitePeaks', 'thisHWM', 'hwmFiles'
        this._route.data.subscribe((data: { thisSite: Site }) => {
            this.NotFound = false;
            this.aSite = data.thisSite;
            this.aSite.HorizontalDatum = data.thisSite.hdatum_id !== undefined ? this.horizontalDatums.filter(function (hd) { return hd.datum_id == data.thisSite.hdatum_id; })[0].datum_name : "";
            this.aSite.HorizontalCollectMethod = data.thisSite.hcollect_method_id !== undefined && data.thisSite.hcollect_method_id > 0 ? this.horizontalCollectMethods.filter(function (hm) { return hm.hcollect_method_id == data.thisSite.hcollect_method_id; })[0].hcollect_method : "";
        }, (err) => {
            this.NotFound = true;
        })
        this._route.data.subscribe((data: { sitePeaks: Array<Peak> }) => {
            this.NotFound = false;
            this.peaks = data.sitePeaks;
        }, (err) => {
            this.NotFound = true;
        })
        this._route.data.subscribe((data: {thisHWM: hwm}) => {
            this.NotFound = false;
            this.aHWM = data.thisHWM;
            if (data.thisHWM.flag_member_id !== undefined && data.thisHWM.flag_member_id > 0) {
                this._STNServices.getMemberName(data.thisHWM.flag_member_id).subscribe(response =>{
                    this.aHWM.flagMember = response;
                });
            }
            if (data.thisHWM.survey_member_id !== undefined && data.thisHWM.survey_member_id > 0) {                
                this._STNServices.getMemberName(data.thisHWM.survey_member_id).subscribe(response => {
                    this.aHWM.surveyMember = response;
                });                
            }
            this.aHWM.eventName = this.events.filter(function (e) { return e.event_id == data.thisHWM.event_id; })[0].event_name;
            this.aHWM.hwmType = this.hwmTypes.filter(function (ht) { return ht.hwm_type_id == data.thisHWM.hwm_type_id; })[0].hwm_type;
            this.aHWM.hwmQuality = data.thisHWM.hwm_quality_id !== undefined && data.thisHWM.hwm_quality_id > 0 ? this.hwmQualities.filter(function (hq) { return hq.hwm_quality_id == data.thisHWM.hwm_quality_id; })[0].hwm_quality : "";
            this.aHWM.vCollectMethod = data.thisHWM.vcollect_method_id !== undefined && data.thisHWM.vcollect_method_id > 0 ? this.verticalCollectMethods.filter(function (vc) { return vc.vcollect_method_id == data.thisHWM.vcollect_method_id; })[0].vcollect_method : "";
            this.aHWM.vDatum = data.thisHWM.vdatum_id !== undefined && data.thisHWM.vdatum_id > 0 ? this.verticalDatums.filter(function (vd) { return vd.datum_id == data.thisHWM.vdatum_id; })[0].datum_name : "";
            this.aHWM.hDatum = data.thisHWM.hdatum_id !== undefined && data.thisHWM.hdatum_id > 0 ? this.horizontalDatums.filter(function (hd) { return hd.datum_id == data.thisHWM.hdatum_id; })[0].datum_name : "";
            this.aHWM.markerName = data.thisHWM.marker_id !== undefined && data.thisHWM.marker_id > 0 ? this.markers.filter(function (m) { return m.marker_id == data.thisHWM.marker_id; })[0].marker1 : "";
            this.aHWM.hCollectMethod = data.thisHWM.hcollect_method_id !== undefined && data.thisHWM.hcollect_method_id > 0 ? this.horizontalCollectMethods.filter(function (hcm) { return hcm.hcollect_method_id == data.thisHWM.hcollect_method_id; })[0].hcollect_method : "";
        }, (err) => {
            this.NotFound = true;
        })
        this._route.data.subscribe((data: {hwmFiles: Array<file>}) => {
            this.NoFiles = false;
            this.HWMFiles = data.hwmFiles;
            this.imageFiles = [];
            this.HWMFiles.forEach((hf: file) => {
                if (hf.filetype_id == 1) {
                    // get the source
                    if (hf.source_id) {
                        this._STNServices.getSource(hf.source_id).subscribe((response:Source) =>{
                            hf.source = response;
                            hf.source.sourceAgency = this.agencies.filter(function (a) { return a.agency_id == response.agency_id; })[0].agency_name;
                            this.imageFiles.push(hf);
                        });
                    } else {
                        hf.source = { agency_id: 0, source_id: 0, source_name: "", sourceAgency: ""};
                        this.imageFiles.push(hf);
                    }                                        
                }
            });
        }, (err) => {
            this.NoFiles = true;
        })
    } //end ngOnInit
}