import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OverviewComponent } from './overview/overview.component';
import { PurposeComponent } from './purpose/purpose.component';
import { EpicComponent } from './epic/epic.component';
import { ObjectiveComponent } from './objective/objective.component';
import { ResultComponent } from './result/result.component';
import { SummaryComponent } from './summary/summary.component';
import * as i0 from "@angular/core";
export class AppModule {
    static { this.ɵfac = function AppModule_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AppModule)(); }; }
    static { this.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: AppModule, bootstrap: [AppComponent] }); }
    static { this.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ providers: [
            provideHttpClient(withInterceptorsFromDi())
        ], imports: [BrowserModule,
            AppRoutingModule] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AppModule, [{
        type: NgModule,
        args: [{
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
                providers: [
                    provideHttpClient(withInterceptorsFromDi())
                ],
                bootstrap: [AppComponent]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(AppModule, { declarations: [AppComponent,
        OverviewComponent,
        PurposeComponent,
        EpicComponent,
        ObjectiveComponent,
        ResultComponent,
        SummaryComponent], imports: [BrowserModule,
        AppRoutingModule] }); })();
//# sourceMappingURL=app.module.js.map