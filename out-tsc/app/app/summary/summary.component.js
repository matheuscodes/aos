import Plotly from 'plotly.js-dist';
import { Component, Input, ViewChild } from '@angular/core';
import * as i0 from "@angular/core";
const _c0 = ["summaryRadialChart"];
export class SummaryComponent {
    constructor() { }
    ngAfterViewInit() {
        if (this.everything && this.summaryRadialChart) {
            this.updateChart();
        }
    }
    updateChart() {
        const ids = [];
        const labels = [];
        const parents = [];
        this.everything.forEach(purpose => {
            ids.push(purpose.uuid);
            labels.push(purpose.definition);
            parents.push("");
            Object.keys(purpose.epics).forEach(eKey => {
                const epic = purpose.epics[eKey];
                ids.push(epic.uuid);
                labels.push(epic.title);
                parents.push(purpose.uuid);
                Object.keys(epic.objectives).forEach(oKey => {
                    const objective = epic.objectives[oKey];
                    ids.push(objective.uuid);
                    labels.push(objective.title);
                    parents.push(epic.uuid);
                });
            });
        });
        const data = [{
                type: "sunburst",
                ids,
                labels,
                parents,
                outsidetextfont: { size: 20, color: "#377eb8" },
                // leaf: {opacity: 0.4},
                textposition: 'inside',
                insidetextorientation: 'radial',
                marker: { line: { width: 2 } },
            }];
        console.log(data);
        const layout = {
            height: 1024,
            margin: { l: 0, r: 0, b: 0, t: 0 },
            sunburstcolorway: [],
            extendsunburstcolorway: true
        };
        Plotly.newPlot(this.summaryRadialChart.nativeElement, data, layout);
    }
    static { this.ɵfac = function SummaryComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || SummaryComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: SummaryComponent, selectors: [["app-summary"]], viewQuery: function SummaryComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(_c0, 5);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.summaryRadialChart = _t.first);
        } }, inputs: { everything: "everything" }, standalone: false, decls: 7, vars: 0, consts: [["summaryRadialChart", ""], [1, "card"], ["id", "heading-summary", 1, "card-header"], [1, "mb-0"], [1, "card-body"]], template: function SummaryComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 1)(1, "div", 2)(2, "h2", 3);
            i0.ɵɵtext(3, " Summary ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(4, "div", 4);
            i0.ɵɵelement(5, "div", null, 0);
            i0.ɵɵelementEnd()();
        } }, encapsulation: 2 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SummaryComponent, [{
        type: Component,
        args: [{ selector: 'app-summary', standalone: false, template: "<div class=\"card\">\n  <div class=\"card-header\" id=\"heading-summary\">\n    <h2 class=\"mb-0\">\n      Summary\n    </h2>\n  </div>\n  <div class=\"card-body\">\n    <div #summaryRadialChart></div>\n  </div>\n</div>\n" }]
    }], () => [], { summaryRadialChart: [{
            type: ViewChild,
            args: ['summaryRadialChart', { static: false }]
        }], everything: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(SummaryComponent, { className: "SummaryComponent", filePath: "src/app/summary/summary.component.ts", lineNumber: 10 }); })();
//# sourceMappingURL=summary.component.js.map