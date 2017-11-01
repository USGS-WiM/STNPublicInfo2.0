import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { HWMviewComponent } from './HWMPage/hwm.component';
import { STNService } from './shared/app.services';
import { HWMResolve } from './resolves/hwm.resolve';
import { HWMFilesResolve } from './resolves/hwmFiles.resolve';
import { SiteResolve } from './resolves/site.resolve';
import { SitePeakResolve } from './resolves/sitePeak.resolve';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './not-found/not-found.component';
import { SensorviewComponent } from './SensorPage/sensor.component';
import { SiteOPResolve } from './resolves/siteOP.resolve';
import { SensorResolve } from './resolves/sensor.resolve';
import { SensorFilesResolve } from './resolves/sensorFiles.resolve';

@NgModule({
  declarations: [ AppComponent, HWMviewComponent, SensorviewComponent, PageNotFoundComponent ],
  imports: [ BrowserModule, HttpModule, AppRoutingModule ],
  providers: [STNService, HWMResolve, HWMFilesResolve, SiteResolve, SitePeakResolve, SiteOPResolve, SensorResolve, SensorFilesResolve ],
  bootstrap: [AppComponent]
})
export class AppModule { }
/*
https://stn.wim.usgs.gov/STNPublicInfo/HWMPage?Site=20587&HWM=23715
https://stn.wim.usgs.gov/STNPublicInfo/SensorPage?Site=20587&Sensor=8229
*/