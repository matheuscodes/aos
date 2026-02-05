import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../epic/epic.component";
function PurposeComponent_div_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵelement(1, "app-epic", 8);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const e_r1 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("epic", e_r1.value);
} }
export class PurposeComponent {
    constructor() { }
    static { this.ɵfac = function PurposeComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || PurposeComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: PurposeComponent, selectors: [["app-purpose"]], inputs: { purpose: "purpose" }, standalone: false, decls: 12, vars: 11, consts: [[1, "card"], [1, "card-header", 3, "id"], [1, "mb-0"], ["data-toggle", "collapse", "aria-expanded", "true", 1, "collapsed"], ["data-parent", "#purposes", 1, "collapse", 3, "id"], [1, "card-body"], ["id", "epics", 1, "accordion"], [4, "ngFor", "ngForOf"], [3, "epic"]], template: function PurposeComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "h2", 2)(3, "h2", 3);
            i0.ɵɵtext(4);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(5, "div", 4)(6, "div", 5)(7, "h2");
            i0.ɵɵtext(8, "Epics");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(9, "div", 6);
            i0.ɵɵtemplate(10, PurposeComponent_div_10_Template, 2, 1, "div", 7);
            i0.ɵɵpipe(11, "keyvalue");
            i0.ɵɵelementEnd()()()();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵproperty("id", i0.ɵɵinterpolate1("heading-", ctx.purpose.uuid));
            i0.ɵɵadvance(2);
            i0.ɵɵattribute("data-target", "#collapse-" + ctx.purpose.uuid)("aria-controls", "collapse-" + ctx.purpose.uuid);
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.purpose.definition, " ");
            i0.ɵɵadvance();
            i0.ɵɵproperty("id", i0.ɵɵinterpolate1("collapse-", ctx.purpose.uuid));
            i0.ɵɵattribute("aria-labelledby", "heading-" + ctx.purpose.uuid);
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind1(11, 9, ctx.purpose.epics));
        } }, dependencies: [i1.NgForOf, i2.EpicComponent, i1.KeyValuePipe], encapsulation: 2 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PurposeComponent, [{
        type: Component,
        args: [{ selector: 'app-purpose', standalone: false, template: "<div class=\"card\">\n  <div class=\"card-header\" id=\"heading-{{purpose.uuid}}\">\n    <h2 class=\"mb-0\">\n      <h2 class=\"collapsed\" data-toggle=\"collapse\" [attr.data-target]=\"'#collapse-'+ purpose.uuid\" aria-expanded=\"true\" [attr.aria-controls]=\"'collapse-'+ purpose.uuid\">\n        {{purpose.definition}}\n      </h2>\n    </h2>\n  </div>\n  <div id=\"collapse-{{purpose.uuid}}\" class=\"collapse\" [attr.aria-labelledby]=\"'heading-'+ purpose.uuid\" data-parent=\"#purposes\">\n    <div class=\"card-body\">\n      <h2>Epics</h2>\n      <div class=\"accordion\" id=\"epics\">\n        <div *ngFor = \"let e of purpose.epics | keyvalue\">\n          <app-epic [epic]=\"e.value\"></app-epic>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n" }]
    }], () => [], { purpose: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(PurposeComponent, { className: "PurposeComponent", filePath: "src/app/purpose/purpose.component.ts", lineNumber: 9 }); })();
//# sourceMappingURL=purpose.component.js.map