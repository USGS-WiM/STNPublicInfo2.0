// ------------------------------------------------------------------------------
// ----- site.resolve --------------------------------------------------
// ------------------------------------------------------------------------------

// copyright:   2017 WiM - USGS//
// authors:  Tonia Roddick USGS Wisconsin Internet Mapping
// purpose: resolver to get thisSite

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { Observable } from "rxjs/Observable";
import { Site } from '../shared/interfaces/site';
import { STNService } from '../shared/app.services';

@Injectable()
export class SiteResolve implements Resolve<Site> {

  constructor(private _STNService: STNService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Site> {
     let id = route.queryParams['Site'];
     if (id > 0) return this._STNService.getSite(id);     
  }
}