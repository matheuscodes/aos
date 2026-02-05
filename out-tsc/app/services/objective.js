import Result from './result';
import Efforts from './efforts';
export default class Objective {
    constructor(data, parent) {
        this.uuid = data.uuid;
        this.title = data.title;
        this.time_planned = data.time_planned;
        this.due_date = new Date(data.due_date);
        this.results = {};
        if (data.results) {
            Object.keys(data.results).forEach(key => {
                this.results[key] = new Result(data.results[key], this);
            });
        }
        if (parent) {
            this.cached_parent = parent;
        }
    }
    get total_time() {
        if (!this.cached_total_time) {
            this.cached_total_time = 0;
            Object.keys(this.results).forEach(key => this.cached_total_time += this.results[key].total_time);
        }
        return this.cached_total_time;
    }
    get completion() {
        if (!this.cached_completion_sum) {
            this.cached_completion_sum = 0;
            Object.keys(this.results).forEach(key => this.cached_completion_sum += this.results[key].completion);
        }
        return this.cached_completion_sum / Object.keys(this.results).length;
    }
    relativeCompletion(report) {
        return report.completion / this.allResultsCount();
    }
    relativeDedication(report) {
        return report.dedication / this.estimatedResultsCount();
    }
    estimatedResultsCount() {
        return Object.keys(this.results).map(key => this.results[key]).filter(result => result.time_estimate).length;
    }
    allResultsCount() {
        return Object.keys(this.results).length;
    }
    get report() {
        if (!this.monthly) {
            this.monthly = {};
            Object.keys(this.results).forEach(key => {
                const result = this.results[key];
                Object.keys(result.report.monthly).forEach(month => {
                    if (!this.monthly[month]) {
                        this.monthly[month] = JSON.parse(JSON.stringify(result.report.monthly[month]));
                        this.monthly[month].completion = 0;
                        this.monthly[month].dedication = 0;
                    }
                    else {
                        this.monthly[month].total_time += result.report.monthly[month].total_time;
                        this.monthly[month].total_money += result.report.monthly[month].total_money;
                        this.monthly[month].total_thought += result.report.monthly[month].total_thought;
                        this.monthly[month].total_thew += result.report.monthly[month].total_thew;
                    }
                    this.monthly[month].completion += this.relativeCompletion(result.report.monthly[month]);
                    this.monthly[month].dedication += this.relativeDedication(result.report.monthly[month]);
                });
            });
        }
        return {
            monthly: this.monthly
        };
    }
    get efforts() {
        if (!this.cached_efforts) {
            this.cached_efforts = new Efforts();
            Object.keys(this.results).forEach(key => {
                const result = this.results[key];
                result.efforts.forEach(effort => {
                    this.cached_efforts.addEffort(effort, result, this);
                });
            });
            this.cached_efforts.table.sort((a, b) => {
                if (a.effort.date == b.effort.date)
                    return 0;
                if (a.effort.date < b.effort.date) {
                    return 1;
                }
                else {
                    return -1;
                }
            });
        }
        return this.cached_efforts;
    }
    clearCache() {
        delete this.cached_total_time;
        delete this.cached_completion_sum;
        delete this.monthly;
        delete this.cached_efforts;
        Object.keys(this.results).forEach(r => {
            this.results[r].clearCache();
        });
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
//# sourceMappingURL=objective.js.map