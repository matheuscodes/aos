import { Component, Input, ViewChild } from '@angular/core';
// Using auto import for v4 which includes all necessary registrations
import { Chart } from 'chart.js/auto';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../objective/objective.component";
const _c0 = ["epicChart"];
function EpicComponent_p_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const note_r1 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(note_r1);
} }
function EpicComponent_div_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵelement(1, "app-objective", 9);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const o_r2 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("objective", o_r2);
} }
function sum(a, b) { return a + b; }
function relativiness(reference) {
    return function (a) { return a / reference; };
}
const minToHour = relativiness(60);
Array.prototype.accumulate = function (fn) {
    if (this.length > 0) {
        const r = [this[0]];
        this.reduce(function (a, b) {
            return r[r.length] = fn(a, b);
        });
        return r;
    }
    return this;
};
export class EpicComponent {
    constructor() { }
    ngOnInit() {
        if (this.epic) {
            this.objectives = Object.values(this.epic.objectives);
            this.objectives.sort((a, b) => {
                return parseInt(b.due_date.toJSON().slice(0, 4)) - parseInt(a.due_date.toJSON().slice(0, 4));
            });
        }
    }
    ngAfterViewInit() { this.createChart(); }
    createChart() {
        const keys = Object.keys(this.epic.report.monthly).sort();
        const time = keys.map(i => this.epic.report.monthly[i].total_time).map(minToHour);
        const completions = keys.map(i => this.epic.report.monthly[i].completion).accumulate(sum).map(relativiness(0.01));
        const dedications = keys.map(i => this.epic.report.monthly[i].dedication).accumulate(sum).map(relativiness(0.01));
        const ctx = this.chart.nativeElement.getContext('2d');
        new Chart(ctx, {
            // The type of chart we want to create
            type: 'line',
            // The data for our dataset
            data: {
                labels: keys,
                datasets: [{
                        label: 'Time Spent',
                        // backgroundColor: 'rgba(255, 99, 132,0.1)',
                        // borderColor: 'rgb(255, 99, 132)',
                        data: time
                    }, {
                        label: 'Completion',
                        // backgroundColor: 'rgba(255, 99, 132,0.1)',
                        // borderColor: 'rgb(255, 99, 132)',
                        data: completions
                    }, {
                        label: 'Dedications',
                        // backgroundColor: 'rgba(255, 99, 132,0.1)',
                        // borderColor: 'rgb(255, 99, 132)',
                        data: dedications
                    }]
            },
            // Configuration options go here
            options: {}
        });
    }
    static { this.ɵfac = function EpicComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || EpicComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: EpicComponent, selectors: [["app-epic"]], viewQuery: function EpicComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(_c0, 5);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.chart = _t.first);
        } }, inputs: { epic: "epic" }, standalone: false, decls: 16, vars: 10, consts: [["epicChart", ""], [1, "card"], [1, "card-header", 3, "id"], [1, "mb-0"], ["data-toggle", "collapse", "aria-expanded", "true", 1, "collapsed"], ["data-parent", "#epics", 1, "collapse", 3, "id"], [1, "card-body"], [4, "ngFor", "ngForOf"], ["id", "objectives", 1, "accordion"], [3, "objective"]], template: function EpicComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 1)(1, "div", 2)(2, "h2", 3)(3, "h3", 4);
            i0.ɵɵtext(4);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(5, "div", 5)(6, "div", 6);
            i0.ɵɵelement(7, "canvas", null, 0);
            i0.ɵɵelementStart(9, "h3");
            i0.ɵɵtext(10, "Notes");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(11, EpicComponent_p_11_Template, 2, 1, "p", 7);
            i0.ɵɵelementStart(12, "h3");
            i0.ɵɵtext(13, "Objectives");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(14, "div", 8);
            i0.ɵɵtemplate(15, EpicComponent_div_15_Template, 2, 1, "div", 7);
            i0.ɵɵelementEnd()()()();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵproperty("id", i0.ɵɵinterpolate1("heading-epic-", ctx.epic.uuid));
            i0.ɵɵadvance(2);
            i0.ɵɵattribute("data-target", "#collapse-epic-" + ctx.epic.uuid)("aria-controls", "collapse-epic-" + ctx.epic.uuid);
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.epic.title, " ");
            i0.ɵɵadvance();
            i0.ɵɵproperty("id", i0.ɵɵinterpolate1("collapse-epic-", ctx.epic.uuid));
            i0.ɵɵattribute("aria-labelledby", "heading-epic-" + ctx.epic.uuid);
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("ngForOf", (ctx.epic.notes || "").split("\n"));
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("ngForOf", ctx.objectives);
        } }, dependencies: [i1.NgForOf, i2.ObjectiveComponent], encapsulation: 2 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(EpicComponent, [{
        type: Component,
        args: [{ selector: 'app-epic', standalone: false, template: "<div class=\"card\">\n  <div class=\"card-header\" id=\"heading-epic-{{epic.uuid}}\">\n    <h2 class=\"mb-0\">\n      <h3 class=\"collapsed\" data-toggle=\"collapse\" [attr.data-target]=\"'#collapse-epic-'+ epic.uuid\" aria-expanded=\"true\" [attr.aria-controls]=\"'collapse-epic-'+ epic.uuid\">\n        {{epic.title}}\n      </h3>\n    </h2>\n  </div>\n  <div id=\"collapse-epic-{{epic.uuid}}\" class=\"collapse\" [attr.aria-labelledby]=\"'heading-epic-'+ epic.uuid\" data-parent=\"#epics\">\n    <div class=\"card-body\">\n      <canvas #epicChart></canvas>\n      <h3>Notes</h3>\n      <p *ngFor = \"let note of (epic.notes || '').split('\\n')\">{{note}}</p>\n      <h3>Objectives</h3>\n      <div class=\"accordion\" id=\"objectives\">\n        <div *ngFor = \"let o of objectives\">\n          <app-objective [objective]=\"o\"></app-objective>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n" }]
    }], () => [], { chart: [{
            type: ViewChild,
            args: ['epicChart', { static: false }]
        }], epic: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(EpicComponent, { className: "EpicComponent", filePath: "src/app/epic/epic.component.ts", lineNumber: 27 }); })();
//# sourceMappingURL=epic.component.js.map