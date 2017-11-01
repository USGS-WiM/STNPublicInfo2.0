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
import { sensor } from '../shared/interfaces/sensor';
import { sensorType } from '../shared/interfaces/sensorType';
import { sensorStatus } from '../shared/interfaces/sensorStatus';
import { opMeasure } from '../shared/interfaces/opMeasure';
import { datumLocation } from '../shared/interfaces/datumLocation';

@Component({
    templateUrl: "sensor.component.html"
})

export class SensorviewComponent{
    public baseURL: string = "https://stn.wim.usgs.gov/STNServices"; 
    public aSite: Site;
    public peaks: Array<Peak>;
    public siteOPs: Array<datumLocation>;
    public aSensor: sensor;
    public depSenStatus: sensorStatus;    
    public retSenStatus: sensorStatus;
    public SensorFiles: Array<file>;
    public dataFiles: Array<file>;
    public imageFiles: Array<file>;
    public horizontalDatums: Array<horizontalDatum>;
    public verticalDatums: Array<verticalDatum>;
    public events: Array<event>;
    public horizontalCollectMethods: Array<horizontalCollectMethod>;
    public verticalCollectMethods: Array<verticalCollectMethod>;
    public agencies: Array<agency>;
    public NotFound: boolean;
    public NoFiles: boolean;
    public depTapeDownTable: Array<any>;
    public retTapeDownTable: Array<any>;

    constructor(private _route: ActivatedRoute, private _STNServices: STNService){ }

    ngOnInit(){
        this.NoFiles = false;
        this.depTapeDownTable = [];
        this.retTapeDownTable = [];
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

        // route data resolve must send 'thisSite', 'sitePeaks', 'thisHWM', 'hwmFiles'
        this._route.data.subscribe((data: { thisSite: Site }) => {            
            this.aSite = data.thisSite;
            this.aSite.HorizontalDatum = data.thisSite.hdatum_id !== undefined ? this.horizontalDatums.filter(function (hd) { return hd.datum_id == data.thisSite.hdatum_id; })[0].datum_name : "";
            this.aSite.HorizontalCollectMethod = data.thisSite.hcollect_method_id !== undefined && data.thisSite.hcollect_method_id > 0 ? this.horizontalCollectMethods.filter(function (hm) { return hm.hcollect_method_id == data.thisSite.hcollect_method_id; })[0].hcollect_method : "";
        }, (err) => {
            this.NotFound = true;
        })
        this._route.data.subscribe((data: { sitePeaks: Array<Peak> }) => {
            this.peaks = data.sitePeaks;
        }, (err) => {
            this.NotFound = true;
        })
        this._route.data.subscribe((data: { siteOPs: Array<datumLocation> }) => {
            this.siteOPs = data.siteOPs;
        }, (err) => {
            this.NotFound = true;
        })
        this._route.data.subscribe((data: {thisSensor: sensor}) => {
            this.NotFound = false;
            this.aSensor = data.thisSensor;            
            this.aSensor.eventName = this.events.filter(function (e) { return e.event_id == data.thisSensor.event_id; })[0].event_name;
            //DEPLOYED SECTION
            this.depSenStatus = data.thisSensor.instrument_status.filter(function(ss) {return ss.status == "Deployed";})[0];
            this.depSenStatus.time_stamp = this.getDateTimeParts(this.depSenStatus.time_stamp); // keep it as utc for display
            if (this.depSenStatus.member_id !== undefined && this.depSenStatus.member_id > 0) {
                this._STNServices.getMemberName(this.depSenStatus.member_id).subscribe(response =>{
                    this.depSenStatus.deployer = response;
                });
            }
            //see if the instrument status has a tapedown
            this._STNServices.getInstStatOPMeasures(this.depSenStatus.instrument_status_id).subscribe((response:Array<opMeasure>) => {
                for (var r = 0; r < response.length; r++) {
                    let sensMeasures = response[r];
                    let whichOP = this.siteOPs.filter(function (op) { return op.objective_point_id == response[r].objective_point_id; })[0];
                    if (whichOP !== undefined) {
                        sensMeasures.elevation = whichOP.elev_ft !== undefined ? whichOP.elev_ft.toString() : '';
                        sensMeasures.OPVdatum = this.verticalDatums.filter(function (vd) { return vd.datum_id == whichOP.vdatum_id; })[0].datum_abbreviation;
                        sensMeasures.op_name = whichOP.name;
                        this.depTapeDownTable.push(sensMeasures);
                    }
                }
            });
            //RETRIEVED SECTION
            this.retSenStatus = data.thisSensor.instrument_status.filter(function(ss) {return ss.status == "Retrieved";})[0];
            if (this.retSenStatus === undefined) data.thisSensor.instrument_status.filter(function(ss) {return ss.status == "Lost";})[0];
            if (this.retSenStatus !== undefined) {
                this.retSenStatus.time_stamp = this.getDateTimeParts(this.retSenStatus.time_stamp); // keep it as utc for display
                if (this.retSenStatus.member_id !== undefined && this.retSenStatus.member_id > 0) {
                    this._STNServices.getMemberName(this.retSenStatus.member_id).subscribe(response =>{
                        this.retSenStatus.retriever = response;
                    });
                }            
                //see if the instrument status has a tapedown
                this._STNServices.getInstStatOPMeasures(this.retSenStatus.instrument_status_id).subscribe((response:Array<opMeasure>) => {
                    for (var r = 0; r < response.length; r++) {
                        let retsensMeasures = response[r];
                        let retwhichOP = this.siteOPs.filter(function (op) { return op.objective_point_id == response[r].objective_point_id; })[0];
                        if (retwhichOP !== undefined) {
                            retsensMeasures.elevation = retwhichOP.elev_ft !== undefined ? retwhichOP.elev_ft.toString() : '';
                            retsensMeasures.OPVdatum = this.verticalDatums.filter(function (vd) { return vd.datum_id == retwhichOP.vdatum_id; })[0].datum_abbreviation;
                            retsensMeasures.op_name = retwhichOP.name;
                            this.retTapeDownTable.push(retsensMeasures);
                        }
                    }
                });
            }
        }, (err) => {
            this.NotFound = true;
        })
        this._route.data.subscribe((data: {sensorFiles: Array<file>}) => {
            this.NoFiles = false;
            this.SensorFiles = data.sensorFiles;
            this.dataFiles = [];
            this.imageFiles = [];
            this.SensorFiles.forEach((sf: file) => {
                if (sf.filetype_id == 1) {
                    // get the source
                    if (sf.source_id) {
                        this._STNServices.getSource(sf.source_id).subscribe((response:Source) =>{
                            sf.source = response;
                            sf.source.sourceAgency = this.agencies.filter(function (a) { return a.agency_id == response.agency_id; })[0].agency_name;
                            this.imageFiles.push(sf);
                        });
                    } else {
                        sf.source = { agency_id: 0, source_id: 0, source_name: "", sourceAgency: ""};
                        this.imageFiles.push(sf);
                    }
                }
                if (sf.filetype_id == 2) this.dataFiles.push(sf);
            });
        }, (err) => {
            this.NoFiles = true;
        })
    } //end ngOnInit
    private getDateTimeParts(d): Date {
        let theDate: Date;
        var isDate = Object.prototype.toString.call(d) === '[object Date]';
        if (isDate === false) {
            var y = d.substr(0, 4);
            var m = d.substr(5, 2) - 1; //subtract 1 for index value (January is 0)
            var da = d.substr(8, 2);
            var h = d.substr(11, 2);
            var mi = d.substr(14, 2);
            var sec = d.substr(17, 2);
            theDate = new Date(y, m, da, h, mi, sec);
        } else {
            //this is already a date, return it back
            theDate = d;
        }
        return theDate;
    }
}