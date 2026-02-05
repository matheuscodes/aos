import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
export class ResultComponent {
    constructor() { }
    static { this.ɵfac = function ResultComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ResultComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ResultComponent, selectors: [["app-result"]], inputs: { result: "result" }, standalone: false, decls: 13, vars: 17, consts: [[1, "card"], [1, "card-header", 3, "id"], [1, "mb-0"], ["data-toggle", "collapse", "aria-expanded", "true", 1, "collapsed"], ["data-parent", "#results", 1, "collapse", 3, "id"], [1, "card-body"]], template: function ResultComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "h2", 2)(3, "h5", 3);
            i0.ɵɵtext(4);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(5, "div", 4)(6, "div", 5)(7, "p");
            i0.ɵɵtext(8);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(9, "p");
            i0.ɵɵtext(10);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(11, "p");
            i0.ɵɵtext(12);
            i0.ɵɵelementEnd()()()();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵproperty("id", i0.ɵɵinterpolate1("heading-result-", ctx.result.uuid));
            i0.ɵɵadvance(2);
            i0.ɵɵattribute("data-target", "#collapse-result-" + ctx.result.uuid)("aria-controls", "collapse-result-" + ctx.result.uuid);
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate2(" ", ctx.result.definition, " - ", (ctx.result.completion * 100).toFixed(2), "% ");
            i0.ɵɵadvance();
            i0.ɵɵproperty("id", i0.ɵɵinterpolate1("collapse-result-", ctx.result.uuid));
            i0.ɵɵattribute("aria-labelledby", "heading-result-" + ctx.result.uuid);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate4("", ctx.result.total_time / 60, " hours, ", ctx.result.total_money, " \u20AC, ", ctx.result.total_mental, " ", ctx.result.total_stamina);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.result.efforts.length);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate3("", ctx.result.initial, " \u2192 ", ctx.result.current, " \u2192 ", ctx.result.target);
        } }, encapsulation: 2 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ResultComponent, [{
        type: Component,
        args: [{ selector: 'app-result', standalone: false, template: "<div class=\"card\">\n  <div class=\"card-header\" id=\"heading-result-{{result.uuid}}\">\n    <h2 class=\"mb-0\">\n      <h5 class=\"collapsed\" data-toggle=\"collapse\" [attr.data-target]=\"'#collapse-result-'+ result.uuid\" aria-expanded=\"true\" [attr.aria-controls]=\"'collapse-result-'+ result.uuid\">\n        {{result.definition}} - {{(result.completion*100).toFixed(2)}}%\n      </h5>\n    </h2>\n  </div>\n  <div id=\"collapse-result-{{result.uuid}}\" class=\"collapse\" [attr.aria-labelledby]=\"'heading-result-'+ result.uuid\" data-parent=\"#results\">\n    <div class=\"card-body\">\n      <p>{{result.total_time/60}} hours, {{result.total_money}} \u20AC, {{result.total_mental}} {{result.total_stamina}}</p>\n      <p>{{result.efforts.length}}</p>\n      <p>{{result.initial}} \u2192 {{result.current}} \u2192 {{result.target}}</p>\n    </div>\n  </div>\n</div>\n" }]
    }], () => [], { result: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ResultComponent, { className: "ResultComponent", filePath: "src/app/result/result.component.ts", lineNumber: 9 }); })();
//# sourceMappingURL=result.component.js.map