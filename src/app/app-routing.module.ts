// ------------------------------------------------------------------------------
// -------- app-routing.module --------------------------------------------------
// ------------------------------------------------------------------------------
// copyright: 2017 WiM - USGS
// authors:   Tonia Roddick USGS Wisconsin Internet Mapping
// purpose:   routes for the main page

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from "./app.component";
import { PageNotFoundComponent } from "./not-found/not-found.component";
import { HWMviewComponent } from './HWMPage/hwm.component';
import { SiteResolve } from './resolves/site.resolve';
import { SitePeakResolve } from './resolves/sitePeak.resolve';
import { HWMResolve } from './resolves/hwm.resolve';
import { HWMFilesResolve } from './resolves/hwmFiles.resolve';
import { SensorviewComponent } from './SensorPage/sensor.component';
import { SensorResolve } from './resolves/sensor.resolve';
import { SensorFilesResolve } from './resolves/sensorFiles.resolve';
import { SiteOPResolve } from './resolves/siteOP.resolve';

const appRoutes: Routes = [
    {   
        path: 'HWMPage', //?Site/:siteId&HWM/:hwmId',
        component: HWMviewComponent,
        resolve: {
            thisSite: SiteResolve,
            sitePeaks: SitePeakResolve,
            thisHWM: HWMResolve,
            hwmFiles: HWMFilesResolve
        }
    },
    {   path: 'SensorPage', //?Site:siteId&Sensor:sensorId',
        component: SensorviewComponent,
        resolve: {
            thisSite: SiteResolve,
            sitePeaks: SitePeakResolve,
            siteOPs: SiteOPResolve,
            thisSensor: SensorResolve,
            sensorFiles: SensorFilesResolve
        }
    },
    { 
        path: 'error', 
        component: PageNotFoundComponent 
    },
    { 
        path: '**', 
        component: PageNotFoundComponent 
    }
    
];

export const AppRoutingModule = RouterModule.forRoot(appRoutes);
