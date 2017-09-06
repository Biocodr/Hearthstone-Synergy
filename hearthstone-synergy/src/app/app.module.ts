import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { D3Service } from './d3';

import { AppComponent } from './app.component';
import { BarChartComponent } from './barchart/barchart.component';
import { GraphComponent } from './visuals/graph/graph.component';
import { SHARED_VISUALS } from './visuals/shared';

import { reducers } from './app.reducer';
import { AppEffects }from './app.effects';


@NgModule({
  declarations: [
    AppComponent,
    BarChartComponent,
    GraphComponent,
    ...SHARED_VISUALS,
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AppEffects])
  ],
  providers: [D3Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
