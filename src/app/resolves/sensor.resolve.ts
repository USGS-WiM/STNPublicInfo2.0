// ------------------------------------------------------------------------------
// ----- hwm.resolve --------------------------------------------------
// ------------------------------------------------------------------------------

// copyright:   2017 WiM - USGS//
// authors:  Tonia Roddick USGS Wisconsin Internet Mapping
// purpose: resolver to get thisSensor

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from "rxjs/Observable";
import { STNService } from '../shared/app.services';
import { sensor } from '../shared/interfaces/sensor';

@Injectable()
export class SensorResolve implements Resolve<sensor> {

  constructor(private _STNService: STNService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<sensor> {
     let id = route.queryParams['Sensor'];
     if (id > 0) return this._STNService.getSensor(id);     
  }
}