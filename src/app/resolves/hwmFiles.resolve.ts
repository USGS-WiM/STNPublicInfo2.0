// ------------------------------------------------------------------------------
// ----- hwmFiles.resolve --------------------------------------------------
// ------------------------------------------------------------------------------

// copyright:   2017 WiM - USGS//
// authors:  Tonia Roddick USGS Wisconsin Internet Mapping
// purpose: resolver to get thisHWM's files

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from "rxjs/Observable";
import { STNService } from '../shared/app.services';
import { file } from '../shared/interfaces/file';

@Injectable()
export class HWMFilesResolve implements Resolve<Array<file>> {

  constructor(private _STNService: STNService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Array<file>> {
     let id = route.queryParams['HWM'];
     if (id > 0) return this._STNService.getHWMFiles(id);     
  }
}