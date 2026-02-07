import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OverviewComponent } from './overview/overview.component';
import { PurposeComponent } from './purpose/purpose.component';
import { EpicComponent } from './epic/epic.component';
import { ObjectiveComponent } from './objective/objective.component';
import { ResultComponent } from './result/result.component';
import { SummaryComponent } from './summary/summary.component';

@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    PurposeComponent,
    EpicComponent,
    ObjectiveComponent,
    ResultComponent,
    SummaryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
