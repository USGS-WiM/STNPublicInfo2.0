// ------------------------------------------------------------------------------
// ----- hwmFiles.resolve --------------------------------------------------
// ------------------------------------------------------------------------------

// copyright:   2017 WiM - USGS//
// authors:  Tonia Roddick USGS Wisconsin Internet Mapping
// purpose: resolver to get thisSensor's files

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from "rxjs/Observable";
import { STNService } from '../shared/app.services';
import { file } from '../shared/interfaces/file';

@Injectable()
export class SensorFilesResolve implements Resolve<Array<file>> {

  constructor(private _STNService: STNService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Array<file>> {
     let id = route.queryParams['Sensor'];
     if (id > 0) return this._STNService.getSensorFiles(id);     
  }
}