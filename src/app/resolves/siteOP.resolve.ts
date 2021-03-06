// ------------------------------------------------------------------------------
// ----- sitePeak.resolve --------------------------------------------------
// ------------------------------------------------------------------------------

// copyright:   2017 WiM - USGS//
// authors:  Tonia Roddick USGS Wisconsin Internet Mapping
// purpose: resolver to get peaks for this site

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from "rxjs/Observable";
import { STNService } from '../shared/app.services';
import { Peak } from '../shared/interfaces/peak';
import { datumLocation } from '../shared/interfaces/datumLocation';

@Injectable()
export class SiteOPResolve implements Resolve<Array<datumLocation>> {
    
      constructor(private _STNService: STNService) {}
    
      resolve(route: ActivatedRouteSnapshot): Observable<Array<datumLocation>> {
         let id = route.queryParams['Site'];
         if (id > 0) return this._STNService.getSiteOPs(id);     
      }
    }