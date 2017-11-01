// ------------------------------------------------------------------------------
// ----- not-found.component ----------------------------------------------------
// ------------------------------------------------------------------------------
// copyright:   2017 WiM - USGS
// authors:  Tonia Roddick USGS Wisconsin Internet Mapping             
// purpose: navigation to a url that does not exist will show this page

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  template: `
    <div class="topPad">
      <h3>There was an error retrieving this {{what}}. Please try again from the map, or contact Todd Koenig (tkoenig@usgs.gov) for assistance.</h3>
    </div>`
})
export class PageNotFoundComponent {
  public what:any;

  constructor(private _route:ActivatedRoute){}

  ngOnInit(){
    this._route.params.subscribe(params => {
      this.what = params['error']; 
    });
  }
}
