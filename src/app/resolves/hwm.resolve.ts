// ------------------------------------------------------------------------------
// ----- hwm.resolve --------------------------------------------------
// ------------------------------------------------------------------------------

// copyright:   2017 WiM - USGS//
// authors:  Tonia Roddick USGS Wisconsin Internet Mapping
// purpose: resolver to get thisHWM

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from "rxjs/Observable";
import { STNService } from '../shared/app.services';
import { hwm } from '../shared/interfaces/hwm';

@Injectable()
export class HWMResolve implements Resolve<hwm> {

  constructor(private _STNService: STNService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<hwm> {
     let id = route.queryParams['HWM'];
     if (id > 0) return this._STNService.getHWM(id);     
  }
}