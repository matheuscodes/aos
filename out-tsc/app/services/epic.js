import Objective from './objective';
export default class Epic {
    constructor(data, parent) {
        this.uuid = data.uuid;
        this.title = data.title;
        this.notes = data.notes;
        this.objectives = {};
        if (data.objectives) {
            Object.keys(data.objectives).forEach(key => {
                this.objectives[key] = new Objective(data.objectives[key], this);
            });
        }
        if (parent) {
            this.cached_parent = parent;
        }
    }
    get total_time() {
        if (!this.cached_total_time) {
            this.cached_total_time = 0;
            Object.keys(this.objectives).forEach(key => this.cached_total_time += this.objectives[key].total_time);
        }
        return this.cached_total_time;
    }
    get completion() {
        if (!this.cached_completion_sum) {
            this.cached_completion_sum = 0;
            Object.keys(this.objectives).forEach(key => this.cached_completion_sum += this.objectives[key].completion);
        }
        return this.cached_completion_sum / Object.keys(this.objectives).length;
    }
    relativeCompletion(report) {
        return report.completion / Object.keys(this.objectives).length;
    }
    relativeDedication(report) {
        return report.dedication / Object.keys(this.objectives).length;
    }
    clearCache() {
        delete this.cached_total_time;
        delete this.cached_completion_sum;
        delete this.monthly;
        Object.keys(this.objectives).forEach(o => {
            this.objectives[o].clearCache();
        });
    }
    get report() {
        if (!this.monthly) {
            this.monthly = {};
            Object.keys(this.objectives).forEach(key => {
                const objective = this.objectives[key];
                Object.keys(objective.report.monthly).forEach(month => {
                    if (!this.monthly[month]) {
                        this.monthly[month] = JSON.parse(JSON.stringify(objective.report.monthly[month]));
                        this.monthly[month].completion = 0;
                        this.monthly[month].dedication = 0;
                    }
                    else {
                        this.monthly[month].total_time += objective.report.monthly[month].total_time;
                        this.monthly[month].total_money += objective.report.monthly[month].total_money;
                        this.monthly[month].total_thought += objective.report.monthly[month].total_thought;
                        this.monthly[month].total_thew += objective.report.monthly[month].total_thew;
                    }
                    this.monthly[month].completion += this.relativeCompletion(objective.report.monthly[month]);
                    this.monthly[month].dedication += this.relativeDedication(objective.report.monthly[month]);
                });
            });
        }
        return {
            monthly: this.monthly
        };
    }
    get parent() {
        return this.cached_parent;
    }
    completionTillMonth(month) {
        const latestCompletion = Object.keys(this.report.monthly).filter(key => key <= month).map(key => this.report.monthly[key].completion).reduce((a, b) => a + b, 0);
        if (latestCompletion) {
            return latestCompletion;
        }
        else {
            return 0;
        }
    }
}
//# sourceMappingURL=epic.js.map