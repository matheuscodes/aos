import { Component, Input, ViewChild } from '@angular/core';
// Using auto import for v4 which includes all necessary registrations
import { Chart } from 'chart.js/auto';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../result/result.component";
const _c0 = ["objectiveChart"];
function ObjectiveComponent_div_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵelement(1, "app-result", 20);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const r_r1 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("result", r_r1.value);
} }
function ObjectiveComponent_tr_49_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "td");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "td");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "td");
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "td");
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "td");
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "td");
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "td");
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const e_r2 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(e_r2.effort.date.toJSON().substring(0, 10));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(e_r2.effort.time);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(e_r2.result.definition);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(e_r2.effort.modifier);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(e_r2.effort.comment);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", e_r2.effort.time_spent, " minutes");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", e_r2.effort.money_spent, " \u20AC");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", e_r2.effort.thought_spent, " cog load");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", e_r2.effort.thew_spent, " kcal");
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
export class ObjectiveComponent {
    constructor() { }
    ngAfterViewInit() { this.createChart(); }
    createChart() {
        const keys = Object.keys(this.objective.report.monthly).sort();
        const time = keys.map(i => this.objective.report.monthly[i].total_time).map(minToHour);
        if (this.objective.results) {
            const completions = keys.map(i => this.objective.report.monthly[i].completion).accumulate(sum).map(relativiness(0.01));
            const dedications = keys.map(i => this.objective.report.monthly[i].dedication).accumulate(sum).map(relativiness(0.01));
            const ctx = this.chart.nativeElement.getContext('2d');
            // Build chart configuration for v4 API
            const leftAxisConfig = {
                type: 'linear',
                position: 'left',
                ticks: { min: 0 }
            };
            const rightAxisConfig = {
                type: 'linear',
                position: 'right',
                grid: { display: false },
                ticks: { min: 0 }
            };
            const chartConfig = {
                type: 'line',
                data: {
                    labels: keys,
                    datasets: [{
                            label: 'Time Spent',
                            yAxisID: 'left-y-axis',
                            data: time,
                            type: 'bar'
                        }, {
                            label: 'Completion',
                            yAxisID: 'right-y-axis',
                            data: completions
                        }, {
                            label: 'Dedications',
                            yAxisID: 'right-y-axis',
                            data: dedications
                        }]
                },
                options: {
                    scales: {
                        'left-y-axis': leftAxisConfig,
                        'right-y-axis': rightAxisConfig
                    }
                }
            };
            new Chart(ctx, chartConfig);
        }
    }
    static { this.ɵfac = function ObjectiveComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ObjectiveComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ObjectiveComponent, selectors: [["app-objective"]], viewQuery: function ObjectiveComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(_c0, 5);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.chart = _t.first);
        } }, inputs: { objective: "objective" }, standalone: false, decls: 50, vars: 14, consts: [["objectiveChart", ""], [1, "card"], [1, "card-header", 3, "id"], [1, "mb-0"], ["data-toggle", "collapse", "aria-expanded", "true", 1, "collapsed"], ["data-parent", "#objectives", 1, "collapse", 3, "id"], [1, "card-body"], ["width", "100%", "cellspacing", "10", 2, "border-collapse", "unset"], ["width", "40%"], ["id", "results", 1, "accordion"], [4, "ngFor", "ngForOf"], ["colspan", "2"], [1, "table"], [1, "thead-light"], ["scope", "col"], ["scope", "col", 2, "text-align", "left"], ["width", "64pt", "src", "https://thenounproject.com/api/private/icons/2896455/edit/"], ["width", "64pt", "src", "https://thenounproject.com/api/private/icons/1687804/edit/"], ["width", "64pt", "src", "https://thenounproject.com/api/private/icons/1061782/edit/"], ["width", "64pt", "src", "https://thenounproject.com/api/private/icons/1510475/edit/"], [3, "result"]], template: function ObjectiveComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 1)(1, "div", 2)(2, "h2", 3)(3, "h4", 4);
            i0.ɵɵtext(4);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(5, "div", 5)(6, "div", 6)(7, "table", 7)(8, "tr")(9, "td", 8)(10, "h4");
            i0.ɵɵtext(11, "Key Results");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(12, "td")(13, "h4");
            i0.ɵɵtext(14, "Progress");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(15, "tr")(16, "td")(17, "div", 9);
            i0.ɵɵtemplate(18, ObjectiveComponent_div_18_Template, 2, 1, "div", 10);
            i0.ɵɵpipe(19, "keyvalue");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(20, "td");
            i0.ɵɵelement(21, "canvas", null, 0);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(23, "tr")(24, "td", 11)(25, "h4");
            i0.ɵɵtext(26, "Efforts");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(27, "table", 12)(28, "thead", 13)(29, "tr")(30, "th", 14);
            i0.ɵɵtext(31, "Date");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(32, "th", 14);
            i0.ɵɵtext(33, "Time");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(34, "th", 14);
            i0.ɵɵtext(35, "Result");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(36, "th", 14);
            i0.ɵɵtext(37, "Modifier");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(38, "th", 14);
            i0.ɵɵtext(39, "Comment");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(40, "th", 15);
            i0.ɵɵelement(41, "img", 16);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(42, "th", 15);
            i0.ɵɵelement(43, "img", 17);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(44, "th", 15);
            i0.ɵɵelement(45, "img", 18);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(46, "th", 15);
            i0.ɵɵelement(47, "img", 19);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(48, "tbody");
            i0.ɵɵtemplate(49, ObjectiveComponent_tr_49_Template, 19, 9, "tr", 10);
            i0.ɵɵelementEnd()()()()()()()();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵproperty("id", i0.ɵɵinterpolate1("heading-objective-", ctx.objective.uuid));
            i0.ɵɵadvance(2);
            i0.ɵɵattribute("data-target", "#collapse-objective-" + ctx.objective.uuid)("aria-controls", "collapse-objective-" + ctx.objective.uuid);
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate3(" ", ctx.objective.title, " (", ctx.objective.due_date.toJSON().slice(0, 4), ") - ", (ctx.objective.completion * 100).toFixed(2), "% ");
            i0.ɵɵadvance();
            i0.ɵɵproperty("id", i0.ɵɵinterpolate1("collapse-objective-", ctx.objective.uuid));
            i0.ɵɵattribute("aria-labelledby", "heading-objective-" + ctx.objective.uuid);
            i0.ɵɵadvance(13);
            i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind1(19, 12, ctx.objective.results));
            i0.ɵɵadvance(31);
            i0.ɵɵproperty("ngForOf", ctx.objective.efforts.table);
        } }, dependencies: [i1.NgForOf, i2.ResultComponent, i1.KeyValuePipe], encapsulation: 2 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ObjectiveComponent, [{
        type: Component,
        args: [{ selector: 'app-objective', standalone: false, template: "<div class=\"card\">\n  <div class=\"card-header\" id=\"heading-objective-{{objective.uuid}}\">\n    <h2 class=\"mb-0\">\n      <h4 class=\"collapsed\" data-toggle=\"collapse\" [attr.data-target]=\"'#collapse-objective-'+ objective.uuid\" aria-expanded=\"true\" [attr.aria-controls]=\"'collapse-objective-'+ objective.uuid\">\n        {{objective.title}} ({{objective.due_date.toJSON().slice(0,4)}}) - {{(objective.completion*100).toFixed(2)}}%\n      </h4>\n    </h2>\n  </div>\n  <div id=\"collapse-objective-{{objective.uuid}}\" class=\"collapse\" [attr.aria-labelledby]=\"'heading-objective-'+ objective.uuid\" data-parent=\"#objectives\">\n    <div class=\"card-body\">\n      <table width='100%' cellspacing=\"10\" style=\"border-collapse:unset\">\n        <tr>\n          <td width=\"40%\">\n            <h4>Key Results</h4>\n          </td>\n          <td>\n            <h4>Progress</h4>\n          </td>\n        </tr>\n        <tr>\n          <td>\n            <div class=\"accordion\" id=\"results\">\n              <div *ngFor = \"let r of objective.results | keyvalue\">\n                <app-result [result]=\"r.value\"></app-result>\n              </div>\n            </div>\n          </td>\n          <td>\n            <canvas #objectiveChart></canvas>\n          </td>\n        </tr>\n        <tr>\n          <td colspan=\"2\">\n            <h4>Efforts</h4>\n            <table class=\"table\">\n              <thead class=\"thead-light\">\n                <tr>\n                  <th scope=\"col\">Date</th>\n                  <th scope=\"col\">Time</th>\n                  <th scope=\"col\">Result</th>\n                  <th scope=\"col\">Modifier</th>\n                  <th scope=\"col\">Comment</th>\n                  <th scope=\"col\" style=\"text-align: left\"><img width=\"64pt\" src=\"https://thenounproject.com/api/private/icons/2896455/edit/\"/></th>\n                  <th scope=\"col\" style=\"text-align: left\"><img width=\"64pt\" src=\"https://thenounproject.com/api/private/icons/1687804/edit/\"/></th>\n                  <th scope=\"col\" style=\"text-align: left\"><img width=\"64pt\" src=\"https://thenounproject.com/api/private/icons/1061782/edit/\"/></th>\n                  <th scope=\"col\" style=\"text-align: left\"><img width=\"64pt\" src=\"https://thenounproject.com/api/private/icons/1510475/edit/\"/></th>\n                </tr>\n              </thead>\n              <tbody>\n                <tr *ngFor = \"let e of objective.efforts.table\">\n                  <td>{{e.effort.date.toJSON().substring(0,10)}}</td>\n                  <td>{{e.effort.time}}</td>\n                  <td>{{e.result.definition}}</td>\n                  <td>{{e.effort.modifier}}</td>\n                  <td>{{e.effort.comment}}</td>\n                  <td>{{e.effort.time_spent}} minutes</td>\n                  <td>{{e.effort.money_spent}} \u20AC</td>\n                  <td>{{e.effort.thought_spent}} cog load</td>\n                  <td>{{e.effort.thew_spent}} kcal</td>\n                </tr>\n              </tbody>\n            </table>\n          </td>\n        </tr>\n      </table>\n    </div>\n  </div>\n</div>\n" }]
    }], () => [], { chart: [{
            type: ViewChild,
            args: ['objectiveChart', { static: false }]
        }], objective: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ObjectiveComponent, { className: "ObjectiveComponent", filePath: "src/app/objective/objective.component.ts", lineNumber: 36 }); })();
//# sourceMappingURL=objective.component.js.map