import { Component, ViewChild } from '@angular/core';
import Effort from '../../services/effort';
import * as i0 from "@angular/core";
import * as i1 from "../data.service";
import * as i2 from "@angular/common";
import * as i3 from "../purpose/purpose.component";
import * as i4 from "../objective/objective.component";
import * as i5 from "../summary/summary.component";
const _c0 = ["revenueLineChart"];
function OverviewComponent_app_summary_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-summary", 19);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("everything", ctx_r0.getDataArray());
} }
function OverviewComponent_div_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵelement(1, "app-purpose", 20);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const p_r2 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("purpose", p_r2.value);
} }
function OverviewComponent_li_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 2)(1, "a", 21);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const yearly_r3 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", i0.ɵɵinterpolate1("", yearly_r3.key, "-tab"))("href", i0.ɵɵinterpolate1("#year-", yearly_r3.key), i0.ɵɵsanitizeUrl);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(yearly_r3.key);
} }
function OverviewComponent_div_26_tr_27_option_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 61);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const o_r8 = ctx.$implicit;
    i0.ɵɵproperty("value", o_r8.uuid);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", o_r8.title, " ");
} }
function OverviewComponent_div_26_tr_27_div_18_option_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 61);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const r_r10 = ctx.$implicit;
    i0.ɵɵproperty("value", r_r10.value.uuid);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", r_r10.value.definition, " ");
} }
function OverviewComponent_div_26_tr_27_div_18_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 41)(1, "select", 46);
    i0.ɵɵlistener("change", function OverviewComponent_div_26_tr_27_div_18_Template_select_change_1_listener($event) { i0.ɵɵrestoreView(_r9); const e_r6 = i0.ɵɵnextContext().$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.selectResult($event, e_r6, e_r6.objective.results)); });
    i0.ɵɵelementStart(2, "option", 47);
    i0.ɵɵtext(3, "Result");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, OverviewComponent_div_26_tr_27_div_18_option_4_Template, 2, 2, "option", 48);
    i0.ɵɵpipe(5, "keyvalue");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const e_r6 = i0.ɵɵnextContext().$implicit;
    const yearly_r7 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", i0.ɵɵinterpolate1("objective-select-", yearly_r7.key));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind1(5, 3, e_r6.objective.results));
} }
function OverviewComponent_div_26_tr_27_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr")(1, "td")(2, "div", 41)(3, "input", 42);
    i0.ɵɵlistener("change", function OverviewComponent_div_26_tr_27_Template_input_change_3_listener($event) { const e_r6 = i0.ɵɵrestoreView(_r5).$implicit; return i0.ɵɵresetView(e_r6.effort.date = $event.target.value); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 43)(5, "span", 44);
    i0.ɵɵtext(6, "\uD83D\uDCC5");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(7, "div", 41)(8, "input", 45);
    i0.ɵɵlistener("change", function OverviewComponent_div_26_tr_27_Template_input_change_8_listener($event) { const e_r6 = i0.ɵɵrestoreView(_r5).$implicit; return i0.ɵɵresetView(e_r6.effort.time = $event.target.value); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "div", 43)(10, "span", 44);
    i0.ɵɵtext(11, "\u23F0");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(12, "td")(13, "div", 41)(14, "select", 46);
    i0.ɵɵlistener("change", function OverviewComponent_div_26_tr_27_Template_select_change_14_listener($event) { const e_r6 = i0.ɵɵrestoreView(_r5).$implicit; const yearly_r7 = i0.ɵɵnextContext().$implicit; const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.selectObjective($event, e_r6, yearly_r7.value.objectives)); });
    i0.ɵɵelementStart(15, "option", 47);
    i0.ɵɵtext(16, "Objective");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(17, OverviewComponent_div_26_tr_27_option_17_Template, 2, 2, "option", 48);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(18, OverviewComponent_div_26_tr_27_div_18_Template, 6, 5, "div", 49);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "td")(20, "div", 50)(21, "input", 51);
    i0.ɵɵlistener("change", function OverviewComponent_div_26_tr_27_Template_input_change_21_listener($event) { const e_r6 = i0.ɵɵrestoreView(_r5).$implicit; return i0.ɵɵresetView(e_r6.effort.modifier = $event.target.value); });
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(22, "td")(23, "div", 52)(24, "textarea", 53);
    i0.ɵɵlistener("change", function OverviewComponent_div_26_tr_27_Template_textarea_change_24_listener($event) { const e_r6 = i0.ɵɵrestoreView(_r5).$implicit; return i0.ɵɵresetView(e_r6.effort.comment = $event.target.value); });
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(25, "td")(26, "div", 50)(27, "div", 54)(28, "span", 55);
    i0.ɵɵelement(29, "img", 56);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(30, "input", 57);
    i0.ɵɵlistener("change", function OverviewComponent_div_26_tr_27_Template_input_change_30_listener($event) { const e_r6 = i0.ɵɵrestoreView(_r5).$implicit; return i0.ɵɵresetView(e_r6.effort.time_spent = $event.target.value); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(31, "div", 43)(32, "span", 55);
    i0.ɵɵtext(33, "minutes");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(34, "div", 50)(35, "div", 54)(36, "span", 55);
    i0.ɵɵelement(37, "img", 58);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(38, "input", 57);
    i0.ɵɵlistener("change", function OverviewComponent_div_26_tr_27_Template_input_change_38_listener($event) { const e_r6 = i0.ɵɵrestoreView(_r5).$implicit; return i0.ɵɵresetView(e_r6.effort.money_spent = $event.target.value); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(39, "div", 43)(40, "span", 55);
    i0.ɵɵtext(41, ".00 \u20AC");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(42, "div", 50)(43, "div", 54)(44, "span", 55);
    i0.ɵɵelement(45, "img", 59);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(46, "input", 57);
    i0.ɵɵlistener("change", function OverviewComponent_div_26_tr_27_Template_input_change_46_listener($event) { const e_r6 = i0.ɵɵrestoreView(_r5).$implicit; return i0.ɵɵresetView(e_r6.effort.thought_spent = $event.target.value); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(47, "div", 43)(48, "span", 55);
    i0.ɵɵtext(49, "cog load");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(50, "div", 50)(51, "div", 54)(52, "span", 55);
    i0.ɵɵelement(53, "img", 60);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(54, "input", 57);
    i0.ɵɵlistener("change", function OverviewComponent_div_26_tr_27_Template_input_change_54_listener($event) { const e_r6 = i0.ɵɵrestoreView(_r5).$implicit; return i0.ɵɵresetView(e_r6.effort.thew_spent = $event.target.value); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(55, "div", 43)(56, "span", 55);
    i0.ɵɵtext(57, "kcal");
    i0.ɵɵelementEnd()()()()();
} if (rf & 2) {
    const e_r6 = ctx.$implicit;
    const yearly_r7 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(14);
    i0.ɵɵproperty("id", i0.ɵɵinterpolate1("objective-select-", yearly_r7.key));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", yearly_r7.value.objectives);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", e_r6.objective);
} }
function OverviewComponent_div_26_tr_49_Template(rf, ctx) { if (rf & 1) {
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
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const e_r11 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(e_r11.objective.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", (e_r11.Q1.completion * 100).toFixed(2), "%");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", (e_r11.Q2.completion * 100).toFixed(2), "% (", ((e_r11.Q2.completion - e_r11.Q1.completion) * 100).toFixed(2), "%)");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", (e_r11.Q3.completion * 100).toFixed(2), "% (", ((e_r11.Q3.completion - e_r11.Q2.completion) * 100).toFixed(2), "%)");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", (e_r11.Q4.completion * 100).toFixed(2), "% (", ((e_r11.Q4.completion - e_r11.Q3.completion) * 100).toFixed(2), "%)");
} }
function OverviewComponent_div_26_tr_68_Template(rf, ctx) { if (rf & 1) {
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
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const e_r12 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(e_r12.epic.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", (e_r12.previous.completion * 100).toFixed(2), "%");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", (e_r12.Q1.completion * 100).toFixed(2), "% (", ((e_r12.Q1.completion - e_r12.previous.completion) * 100).toFixed(2), "%)");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", (e_r12.Q2.completion * 100).toFixed(2), "% (", ((e_r12.Q2.completion - e_r12.Q1.completion) * 100).toFixed(2), "%)");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", (e_r12.Q3.completion * 100).toFixed(2), "% (", ((e_r12.Q3.completion - e_r12.Q2.completion) * 100).toFixed(2), "%)");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", (e_r12.Q4.completion * 100).toFixed(2), "% (", ((e_r12.Q4.completion - e_r12.Q3.completion) * 100).toFixed(2), "%)");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", ((e_r12.Q4.completion - e_r12.previous.completion) * 100).toFixed(2), "%");
} }
function OverviewComponent_div_26_tr_87_Template(rf, ctx) { if (rf & 1) {
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
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const e_r13 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(e_r13.purpose.definition);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", (e_r13.previous.completion * 100).toFixed(2), "%");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", (e_r13.Q1.completion * 100).toFixed(2), "% (", ((e_r13.Q1.completion - e_r13.previous.completion) * 100).toFixed(2), "%)");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", (e_r13.Q2.completion * 100).toFixed(2), "% (", ((e_r13.Q2.completion - e_r13.Q1.completion) * 100).toFixed(2), "%)");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", (e_r13.Q3.completion * 100).toFixed(2), "% (", ((e_r13.Q3.completion - e_r13.Q2.completion) * 100).toFixed(2), "%)");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", (e_r13.Q4.completion * 100).toFixed(2), "% (", ((e_r13.Q4.completion - e_r13.Q3.completion) * 100).toFixed(2), "%)");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", ((e_r13.Q4.completion - e_r13.previous.completion) * 100).toFixed(2), "%");
} }
function OverviewComponent_div_26_div_91_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵelement(1, "app-objective", 62);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const o_r14 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("objective", o_r14);
} }
function OverviewComponent_div_26_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 22)(1, "button", 23);
    i0.ɵɵtext(2, " Log new efforts ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 24)(4, "div", 25)(5, "div", 26)(6, "div", 27)(7, "h5", 28);
    i0.ɵɵtext(8, "Log new efforts");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "button", 29)(10, "span", 30);
    i0.ɵɵtext(11, "\u00D7");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(12, "div", 31)(13, "table", 32)(14, "thead", 33)(15, "tr")(16, "th", 34);
    i0.ɵɵtext(17, "Date/Time");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "th", 35);
    i0.ɵɵtext(19, "Result");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "th", 35);
    i0.ɵɵtext(21, "Modifier");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "th", 35);
    i0.ɵɵtext(23, "Comment");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "th", 36);
    i0.ɵɵtext(25, "Spent");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(26, "tbody");
    i0.ɵɵtemplate(27, OverviewComponent_div_26_tr_27_Template, 58, 4, "tr", 12);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(28, "div", 37)(29, "button", 38);
    i0.ɵɵlistener("click", function OverviewComponent_div_26_Template_button_click_29_listener() { i0.ɵɵrestoreView(_r4); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.addQueuedEffort()); });
    i0.ɵɵtext(30, "Add Effort");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(31, "button", 39);
    i0.ɵɵlistener("click", function OverviewComponent_div_26_Template_button_click_31_listener() { i0.ɵɵrestoreView(_r4); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.saveEfforts()); });
    i0.ɵɵtext(32, "Save Efforts");
    i0.ɵɵelementEnd()()()()();
    i0.ɵɵelementStart(33, "h3");
    i0.ɵɵtext(34, "Impact");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(35, "table", 32)(36, "thead", 33)(37, "tr")(38, "th", 35);
    i0.ɵɵtext(39, "Objective");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(40, "th", 35);
    i0.ɵɵtext(41);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(42, "th", 35);
    i0.ɵɵtext(43);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(44, "th", 35);
    i0.ɵɵtext(45);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(46, "th", 35);
    i0.ɵɵtext(47);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(48, "tbody");
    i0.ɵɵtemplate(49, OverviewComponent_div_26_tr_49_Template, 11, 8, "tr", 12);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(50, "table", 32)(51, "thead", 33)(52, "tr")(53, "th", 35);
    i0.ɵɵtext(54, "Epic");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(55, "th", 35);
    i0.ɵɵtext(56, "Previous Year");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(57, "th", 35);
    i0.ɵɵtext(58);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(59, "th", 35);
    i0.ɵɵtext(60);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(61, "th", 35);
    i0.ɵɵtext(62);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(63, "th", 35);
    i0.ɵɵtext(64);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(65, "th", 35);
    i0.ɵɵtext(66, "Total");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(67, "tbody");
    i0.ɵɵtemplate(68, OverviewComponent_div_26_tr_68_Template, 15, 11, "tr", 12);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(69, "table", 32)(70, "thead", 33)(71, "tr")(72, "th", 35);
    i0.ɵɵtext(73, "Purpose");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(74, "th", 35);
    i0.ɵɵtext(75, "Previous Year");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(76, "th", 35);
    i0.ɵɵtext(77);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(78, "th", 35);
    i0.ɵɵtext(79);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(80, "th", 35);
    i0.ɵɵtext(81);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(82, "th", 35);
    i0.ɵɵtext(83);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(84, "th", 35);
    i0.ɵɵtext(85, "Total");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(86, "tbody");
    i0.ɵɵtemplate(87, OverviewComponent_div_26_tr_87_Template, 15, 11, "tr", 12);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(88, "h3");
    i0.ɵɵtext(89, "Objectives");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(90, "div", 40);
    i0.ɵɵtemplate(91, OverviewComponent_div_26_div_91_Template, 2, 1, "div", 12);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const yearly_r7 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("id", i0.ɵɵinterpolate1("year-", yearly_r7.key));
    i0.ɵɵadvance();
    i0.ɵɵattribute("data-target", "#modal-" + yearly_r7.key);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("id", i0.ɵɵinterpolate1("modal-", yearly_r7.key));
    i0.ɵɵadvance(24);
    i0.ɵɵproperty("ngForOf", ctx_r0.queuedEfforts);
    i0.ɵɵadvance(14);
    i0.ɵɵtextInterpolate1("", yearly_r7.value.year, "/Q1");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", yearly_r7.value.year, "/Q2");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", yearly_r7.value.year, "/Q3");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", yearly_r7.value.year, "/Q4");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", yearly_r7.value.report.objectives);
    i0.ɵɵadvance(9);
    i0.ɵɵtextInterpolate1("", yearly_r7.value.year, "/Q1");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", yearly_r7.value.year, "/Q2");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", yearly_r7.value.year, "/Q3");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", yearly_r7.value.year, "/Q4");
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngForOf", yearly_r7.value.report.epics);
    i0.ɵɵadvance(9);
    i0.ɵɵtextInterpolate1("", yearly_r7.value.year, "/Q1");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", yearly_r7.value.year, "/Q2");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", yearly_r7.value.year, "/Q3");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", yearly_r7.value.year, "/Q4");
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngForOf", yearly_r7.value.report.purposes);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngForOf", yearly_r7.value.objectives);
} }
export class OverviewComponent {
    constructor(dataService) {
        this.dataService = dataService;
        this.data = [];
        this.queuedEfforts = [];
    }
    getData() {
        const data = this.dataService.getData();
        Object.keys(data).forEach(i => {
            if (!this.data.map(i => i.uuid).includes(i))
                this.data.push(data[i]);
        });
        return data;
    }
    getDataArray() {
        return this.data;
    }
    getYearly() {
        return this.dataService.getYearly();
    }
    addQueuedEffort() {
        this.queuedEfforts.push({ effort: {} });
    }
    selectObjective(test, effort, objectives) {
        const objectiveUUID = test.target.value;
        const objective = objectives.filter((o) => o.uuid == objectiveUUID)[0];
        effort.objective = objective;
    }
    selectResult(test, effort, results) {
        const resultUUID = test.target.value;
        const result = results[resultUUID];
        effort.result = result;
    }
    saveEfforts() {
        const failed = [];
        this.queuedEfforts.forEach(queuedEffort => {
            try {
                const createdEffort = new Effort(queuedEffort.effort, queuedEffort.result);
                queuedEffort.result.addEffort(createdEffort);
                this.dataService.clearCache();
            }
            catch (e) {
                console.log(e);
                failed.push(queuedEffort);
            }
        });
        this.dataService.submit();
        this.queuedEfforts = failed;
    }
    static { this.ɵfac = function OverviewComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || OverviewComponent)(i0.ɵɵdirectiveInject(i1.DataService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: OverviewComponent, selectors: [["app-overview"]], viewQuery: function OverviewComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(_c0, 5);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.chart = _t.first);
        } }, standalone: false, decls: 30, vars: 10, consts: [[1, "card", 2, "margin", "10px"], ["id", "overview-tab", "role", "tablist", 1, "nav", "nav-tabs"], [1, "nav-item"], ["id", "summary-tab", "data-toggle", "tab", "href", "#summary", "role", "tab", 1, "nav-link", "active"], ["id", "long-term-tab", "data-toggle", "tab", "href", "#long-term", "role", "tab", 1, "nav-link"], ["id", "yearly-tab", "data-toggle", "tab", "href", "#yearly", "role", "tab", 1, "nav-link"], ["id", "overview-tab-content", 1, "tab-content"], ["id", "summary", "role", "tabpanel", 1, "tab-pane", "fade", "show", "active"], [1, "card-body"], [3, "everything", 4, "ngIf"], ["id", "long-term", "role", "tabpanel", 1, "tab-pane", "fade"], ["id", "purposes", 1, "accordion"], [4, "ngFor", "ngForOf"], ["id", "yearly", "role", "tabpanel", 1, "tab-pane", "fade"], ["id", "yearly-tab", "role", "tablist", 1, "nav", "nav-tabs"], ["class", "nav-item", 4, "ngFor", "ngForOf"], ["id", "yearly-tab-content", 1, "tab-content"], ["class", "tab-pane fade", "role", "tabpanel", 3, "id", 4, "ngFor", "ngForOf"], ["id", "year-none", "role", "tabpanel", 1, "tab-pane", "fade", "show", "active"], [3, "everything"], [3, "purpose"], ["data-toggle", "tab", "role", "tab", 1, "nav-link", 3, "id", "href"], ["role", "tabpanel", 1, "tab-pane", "fade", 3, "id"], ["type", "button", "data-toggle", "modal", 1, "btn", "btn-primary", 2, "margin", "10pt", "width", "calc(100% - 20pt)"], ["tabindex", "-1", "role", "dialog", 1, "modal", "fade", 3, "id"], ["role", "document", 1, "modal-dialog", "modal-dialog-scrollable", "modal-dialog-centered", "modal-xl"], [1, "modal-content"], [1, "modal-header"], ["id", "exampleModalCenterTitle", 1, "modal-title"], ["type", "button", "data-dismiss", "modal", "aria-label", "Close", 1, "close"], ["aria-hidden", "true"], [1, "modal-body"], [1, "table"], [1, "thead-light"], ["scope", "col", "width", "15%"], ["scope", "col"], ["scope", "col", "width", "25%"], [1, "modal-footer"], ["type", "button", 1, "btn", "btn-secondary", 3, "click"], ["type", "button", "data-dismiss", "modal", 1, "btn", "btn-primary", 3, "click"], ["id", "objectives", 1, "accordion"], [1, "input-group", "mb-3"], ["type", "text", "placeholder", "Date", "pattern", "^\\d{4}-([0]\\d|1[0-2])-([0-2]\\d|3[01])$", 1, "form-control", 3, "change"], [1, "input-group-append"], ["id", "basic-addon2", 1, "input-group-text"], ["type", "text", "placeholder", "Time", "pattern", "^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$", 1, "form-control", 3, "change"], [1, "custom-select", 3, "change", "id"], ["selected", ""], [3, "value", 4, "ngFor", "ngForOf"], ["class", "input-group mb-3", 4, "ngIf"], [1, "input-group", "input-group-sm", "mb-3"], ["type", "text", "type", "number", "step", "any", 1, "form-control", 2, "height", "unset", 3, "change"], [1, "input-group"], [1, "form-control", 3, "change"], [1, "input-group-prepend"], [1, "input-group-text"], ["src", "assets/noun_Time_2896455.svg", "height", "24pt"], ["type", "text", "type", "number", 1, "form-control", 2, "height", "unset", 3, "change"], ["src", "assets/noun_Money_1687804.svg", "height", "24pt"], ["src", "assets/noun_Mental Health_1061782.svg", "height", "24pt"], ["src", "assets/noun_heart beat_1510475.svg", "height", "24pt"], [3, "value"], [3, "objective"]], template: function OverviewComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "ul", 1)(2, "li", 2)(3, "a", 3);
            i0.ɵɵtext(4, "Overview");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(5, "li", 2)(6, "a", 4);
            i0.ɵɵtext(7, "Purposes");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(8, "li", 2)(9, "a", 5);
            i0.ɵɵtext(10, "Yearly OKRs");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(11, "div", 6)(12, "div", 7)(13, "div", 8);
            i0.ɵɵtemplate(14, OverviewComponent_app_summary_14_Template, 1, 1, "app-summary", 9);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(15, "div", 10)(16, "div", 8)(17, "div", 11);
            i0.ɵɵtemplate(18, OverviewComponent_div_18_Template, 2, 1, "div", 12);
            i0.ɵɵpipe(19, "keyvalue");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(20, "div", 13)(21, "div", 8)(22, "ul", 14);
            i0.ɵɵtemplate(23, OverviewComponent_li_23_Template, 3, 5, "li", 15);
            i0.ɵɵpipe(24, "keyvalue");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(25, "div", 16);
            i0.ɵɵtemplate(26, OverviewComponent_div_26_Template, 92, 22, "div", 17);
            i0.ɵɵpipe(27, "keyvalue");
            i0.ɵɵelementStart(28, "div", 18);
            i0.ɵɵtext(29, " Select a year. ");
            i0.ɵɵelementEnd()()()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(14);
            i0.ɵɵproperty("ngIf", ctx.getDataArray().length > 0);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind1(19, 4, ctx.getData()));
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind1(24, 6, ctx.getYearly()));
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind1(27, 8, ctx.getYearly()));
        } }, dependencies: [i2.NgForOf, i2.NgIf, i3.PurposeComponent, i4.ObjectiveComponent, i5.SummaryComponent, i2.KeyValuePipe], encapsulation: 2 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(OverviewComponent, [{
        type: Component,
        args: [{ selector: 'app-overview', standalone: false, template: "<div class=\"card\" style=\"margin:10px\">\n  <ul class=\"nav nav-tabs\" id=\"overview-tab\" role=\"tablist\">\n    <li class=\"nav-item\">\n      <a class=\"nav-link active\" id=\"summary-tab\" data-toggle=\"tab\" href=\"#summary\" role=\"tab\">Overview</a>\n    </li>\n    <li class=\"nav-item\">\n      <a class=\"nav-link\" id=\"long-term-tab\" data-toggle=\"tab\" href=\"#long-term\" role=\"tab\">Purposes</a>\n    </li>\n    <li class=\"nav-item\">\n      <a class=\"nav-link\" id=\"yearly-tab\" data-toggle=\"tab\" href=\"#yearly\" role=\"tab\">Yearly OKRs</a>\n    </li>\n  </ul>\n  <div class=\"tab-content\" id=\"overview-tab-content\">\n    <div class=\"tab-pane fade show active\" id=\"summary\" role=\"tabpanel\">\n      <div class=\"card-body\">\n          <app-summary [everything]=\"getDataArray()\" *ngIf=\"getDataArray().length > 0\"></app-summary>\n      </div>\n    </div>\n    <div class=\"tab-pane fade\" id=\"long-term\" role=\"tabpanel\">\n      <div class=\"card-body\">\n        <div class=\"accordion\" id=\"purposes\">\n          <div *ngFor = \"let p of getData() | keyvalue\">\n            <app-purpose [purpose]=\"p.value\"></app-purpose>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"tab-pane fade\" id=\"yearly\" role=\"tabpanel\">\n      <div class=\"card-body\">\n        <ul class=\"nav nav-tabs\" id=\"yearly-tab\" role=\"tablist\">\n          <li *ngFor = \"let yearly of getYearly() | keyvalue\" class=\"nav-item\">\n            <a class=\"nav-link\" id=\"{{yearly.key}}-tab\" data-toggle=\"tab\" href=\"#year-{{yearly.key}}\" role=\"tab\">{{yearly.key}}</a>\n          </li>\n        </ul>\n        <div class=\"tab-content\" id=\"yearly-tab-content\">\n          <div *ngFor = \"let yearly of getYearly() | keyvalue\" class=\"tab-pane fade\" id=\"year-{{yearly.key}}\" role=\"tabpanel\">\n            <!-- Button trigger modal -->\n            <button style=\"margin:10pt; width:calc(100% - 20pt)\" type=\"button\" class=\"btn btn-primary\" data-toggle=\"modal\" [attr.data-target]=\"'#modal-'+yearly.key\">\n              Log new efforts\n            </button>\n\n            <!-- Modal -->\n            <div class=\"modal fade\" id=\"modal-{{yearly.key}}\" tabindex=\"-1\" role=\"dialog\">\n              <div class=\"modal-dialog modal-dialog-scrollable modal-dialog-centered modal-xl\" role=\"document\">\n                <div class=\"modal-content\">\n                  <div class=\"modal-header\">\n                    <h5 class=\"modal-title\" id=\"exampleModalCenterTitle\">Log new efforts</h5>\n                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n                      <span aria-hidden=\"true\">&times;</span>\n                    </button>\n                  </div>\n                  <div class=\"modal-body\">\n                    <table class=\"table\">\n                      <thead class=\"thead-light\">\n                        <tr>\n                          <th scope=\"col\" width=\"15%\">Date/Time</th>\n                          <th scope=\"col\">Result</th>\n                          <th scope=\"col\">Modifier</th>\n                          <th scope=\"col\">Comment</th>\n                          <th scope=\"col\" width=\"25%\">Spent</th>\n                        </tr>\n                      </thead>\n                      <tbody>\n                        <tr *ngFor = \"let e of queuedEfforts\">\n                          <td>\n                            <div class=\"input-group mb-3\">\n                              <input type=\"text\" class=\"form-control\" placeholder=\"Date\" (change)=\"e.effort.date = $event.target.value\" pattern=\"^\\d{4}-([0]\\d|1[0-2])-([0-2]\\d|3[01])$\">\n                              <div class=\"input-group-append\">\n                                <span class=\"input-group-text\" id=\"basic-addon2\">\uD83D\uDCC5</span>\n                              </div>\n                            </div>\n                            <div class=\"input-group mb-3\">\n                              <input type=\"text\" class=\"form-control\" placeholder=\"Time\" (change)=\"e.effort.time = $event.target.value\" pattern=\"^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$\">\n                              <div class=\"input-group-append\">\n                                <span class=\"input-group-text\" id=\"basic-addon2\">\u23F0</span>\n                              </div>\n                            </div>\n                          </td>\n                          <td>\n                            <div class=\"input-group mb-3\">\n                              <select class=\"custom-select\" id=\"objective-select-{{yearly.key}}\" (change)=\"selectObjective($event, e, yearly.value.objectives)\">\n                                <option selected>Objective</option>\n                                <option *ngFor = \"let o of yearly.value.objectives\" [value]=\"o.uuid\" >\n                                  {{o.title}}\n                                </option>\n                              </select>\n                            </div>\n                            <div class=\"input-group mb-3\" *ngIf=\"e.objective\">\n                              <select class=\"custom-select\" id=\"objective-select-{{yearly.key}}\" (change)=\"selectResult($event, e, e.objective.results)\">\n                                <option selected>Result</option>\n                                <option *ngFor = \"let r of e.objective.results | keyvalue\" [value]=\"r.value.uuid\" >\n                                  {{r.value.definition}}\n                                </option>\n                              </select>\n                            </div>\n                          </td>\n                          <td>\n                            <div class=\"input-group input-group-sm mb-3\">\n                              <input type=\"text\" class=\"form-control\" style=\"height:unset\" type=\"number\" step=\"any\" (change)=\"e.effort.modifier = $event.target.value\">\n                            </div>\n                          </td>\n                          <td>\n                            <div class=\"input-group\">\n                              <textarea class=\"form-control\" (change)=\"e.effort.comment = $event.target.value\"></textarea>\n                            </div>\n                          </td>\n                          <td>\n                            <div class=\"input-group input-group-sm mb-3\">\n                              <div class=\"input-group-prepend\">\n                                <span class=\"input-group-text\"><img src=\"assets/noun_Time_2896455.svg\" height=\"24pt\"/></span>\n                              </div>\n                              <input type=\"text\" class=\"form-control\" style=\"height:unset\" type=\"number\" (change)=\"e.effort.time_spent = $event.target.value\">\n                              <div class=\"input-group-append\">\n                                <span class=\"input-group-text\">minutes</span>\n                              </div>\n                            </div>\n                            <div class=\"input-group input-group-sm mb-3\">\n                              <div class=\"input-group-prepend\">\n                                <span class=\"input-group-text\"><img src=\"assets/noun_Money_1687804.svg\" height=\"24pt\"/></span>\n                              </div>\n                              <input type=\"text\" class=\"form-control\" style=\"height:unset\" type=\"number\" (change)=\"e.effort.money_spent = $event.target.value\">\n                              <div class=\"input-group-append\">\n                                <span class=\"input-group-text\">.00 \u20AC</span>\n                              </div>\n                            </div>\n                            <div class=\"input-group input-group-sm mb-3\">\n                              <div class=\"input-group-prepend\">\n                                <span class=\"input-group-text\"><img src=\"assets/noun_Mental Health_1061782.svg\" height=\"24pt\"/></span>\n                              </div>\n                              <input type=\"text\" class=\"form-control\" style=\"height:unset\" type=\"number\" (change)=\"e.effort.thought_spent = $event.target.value\">\n                              <div class=\"input-group-append\">\n                                <span class=\"input-group-text\">cog load</span>\n                              </div>\n                            </div>\n                            <div class=\"input-group input-group-sm mb-3\">\n                              <div class=\"input-group-prepend\">\n                                <span class=\"input-group-text\"><img src=\"assets/noun_heart beat_1510475.svg\" height=\"24pt\"/></span>\n                              </div>\n                              <input type=\"text\" class=\"form-control\" style=\"height:unset\" type=\"number\" (change)=\"e.effort.thew_spent = $event.target.value\">\n                              <div class=\"input-group-append\">\n                                <span class=\"input-group-text\">kcal</span>\n                              </div>\n                            </div>\n                          </td>\n                        </tr>\n                      </tbody>\n                    </table>\n                  </div>\n                  <div class=\"modal-footer\">\n                    <button type=\"button\" class=\"btn btn-secondary\" (click)=\"addQueuedEffort()\">Add Effort</button>\n                    <button type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\" (click)=\"saveEfforts()\">Save Efforts</button>\n                  </div>\n                </div>\n              </div>\n            </div>\n            <h3>Impact</h3>\n            <table class=\"table\">\n              <thead class=\"thead-light\">\n                <tr>\n                  <th scope=\"col\">Objective</th>\n                  <th scope=\"col\">{{yearly.value.year}}/Q1</th>\n                  <th scope=\"col\">{{yearly.value.year}}/Q2</th>\n                  <th scope=\"col\">{{yearly.value.year}}/Q3</th>\n                  <th scope=\"col\">{{yearly.value.year}}/Q4</th>\n                </tr>\n              </thead>\n              <tbody>\n                <tr *ngFor = \"let e of yearly.value.report.objectives\">\n                  <td>{{e.objective.title}}</td>\n                  <td>{{(e.Q1.completion*100).toFixed(2)}}%</td>\n                  <td>{{(e.Q2.completion*100).toFixed(2)}}% ({{((e.Q2.completion - e.Q1.completion)*100).toFixed(2)}}%)</td>\n                  <td>{{(e.Q3.completion*100).toFixed(2)}}% ({{((e.Q3.completion - e.Q2.completion)*100).toFixed(2)}}%)</td>\n                  <td>{{(e.Q4.completion*100).toFixed(2)}}% ({{((e.Q4.completion - e.Q3.completion)*100).toFixed(2)}}%)</td>\n                </tr>\n              </tbody>\n            </table>\n            <table class=\"table\">\n              <thead class=\"thead-light\">\n                <tr>\n                  <th scope=\"col\">Epic</th>\n                  <th scope=\"col\">Previous Year</th>\n                  <th scope=\"col\">{{yearly.value.year}}/Q1</th>\n                  <th scope=\"col\">{{yearly.value.year}}/Q2</th>\n                  <th scope=\"col\">{{yearly.value.year}}/Q3</th>\n                  <th scope=\"col\">{{yearly.value.year}}/Q4</th>\n                  <th scope=\"col\">Total</th>\n                </tr>\n              </thead>\n              <tbody>\n                <tr *ngFor = \"let e of yearly.value.report.epics\">\n                  <td>{{e.epic.title}}</td>\n                  <td>{{(e.previous.completion*100).toFixed(2)}}%</td>\n                  <td>{{(e.Q1.completion*100).toFixed(2)}}% ({{((e.Q1.completion - e.previous.completion)*100).toFixed(2)}}%)</td>\n                  <td>{{(e.Q2.completion*100).toFixed(2)}}% ({{((e.Q2.completion - e.Q1.completion)*100).toFixed(2)}}%)</td>\n                  <td>{{(e.Q3.completion*100).toFixed(2)}}% ({{((e.Q3.completion - e.Q2.completion)*100).toFixed(2)}}%)</td>\n                  <td>{{(e.Q4.completion*100).toFixed(2)}}% ({{((e.Q4.completion - e.Q3.completion)*100).toFixed(2)}}%)</td>\n                  <td>{{((e.Q4.completion - e.previous.completion)*100).toFixed(2)}}%</td>\n                </tr>\n              </tbody>\n            </table>\n            <table class=\"table\">\n              <thead class=\"thead-light\">\n                <tr>\n                  <th scope=\"col\">Purpose</th>\n                  <th scope=\"col\">Previous Year</th>\n                  <th scope=\"col\">{{yearly.value.year}}/Q1</th>\n                  <th scope=\"col\">{{yearly.value.year}}/Q2</th>\n                  <th scope=\"col\">{{yearly.value.year}}/Q3</th>\n                  <th scope=\"col\">{{yearly.value.year}}/Q4</th>\n                  <th scope=\"col\">Total</th>\n                </tr>\n              </thead>\n              <tbody>\n                <tr *ngFor = \"let e of yearly.value.report.purposes\">\n                  <td>{{e.purpose.definition}}</td>\n                  <td>{{(e.previous.completion*100).toFixed(2)}}%</td>\n                  <td>{{(e.Q1.completion*100).toFixed(2)}}% ({{((e.Q1.completion - e.previous.completion)*100).toFixed(2)}}%)</td>\n                  <td>{{(e.Q2.completion*100).toFixed(2)}}% ({{((e.Q2.completion - e.Q1.completion)*100).toFixed(2)}}%)</td>\n                  <td>{{(e.Q3.completion*100).toFixed(2)}}% ({{((e.Q3.completion - e.Q2.completion)*100).toFixed(2)}}%)</td>\n                  <td>{{(e.Q4.completion*100).toFixed(2)}}% ({{((e.Q4.completion - e.Q3.completion)*100).toFixed(2)}}%)</td>\n                  <td>{{((e.Q4.completion - e.previous.completion)*100).toFixed(2)}}%</td>\n                </tr>\n              </tbody>\n            </table>\n            <h3>Objectives</h3>\n            <div class=\"accordion\" id=\"objectives\">\n              <div *ngFor = \"let o of yearly.value.objectives\">\n                <app-objective [objective]=\"o\"></app-objective>\n              </div>\n            </div>\n          </div>\n          <div class=\"tab-pane fade show active\" id=\"year-none\" role=\"tabpanel\">\n            Select a year.\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n" }]
    }], () => [{ type: i1.DataService }], { chart: [{
            type: ViewChild,
            args: ['revenueLineChart', { static: false }]
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(OverviewComponent, { className: "OverviewComponent", filePath: "src/app/overview/overview.component.ts", lineNumber: 11 }); })();
//# sourceMappingURL=overview.component.js.map