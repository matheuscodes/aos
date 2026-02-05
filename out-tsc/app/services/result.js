import Effort from './effort';
export default class Result {
    constructor(data, parent) {
        this.uuid = data.uuid;
        this.definition = data.definition;
        this.target = (data.target || 0);
        this.initial = (data.initial || 0);
        this.time_estimate = data.time_estimate || data.estimate;
        this.efforts = [];
        if (data.efforts) {
            data.efforts.forEach(effort => {
                this.efforts.push(new Effort(effort, this));
            });
        }
        if (parent) {
            this.cached_parent = parent;
        }
    }
    get total_time() {
        if (!this.cached_total_time) {
            this.cached_total_time = 0;
            this.efforts.forEach(effort => this.cached_total_time += effort.time_spent);
        }
        return this.cached_total_time;
    }
    get current() {
        if (!this.cached_current) {
            this.cached_current = this.initial;
            this.efforts.forEach(effort => this.cached_current += effort.modifier);
        }
        return this.cached_current;
    }
    get completion() {
        const target = this.target || this.current;
        if (target === this.initial) {
            return 0;
        }
        return (this.current - this.initial) / (target - this.initial);
    }
    relativeCompletion(effort) {
        const target = this.target || this.current;
        if (target === this.initial) {
            return 0;
        }
        return effort.modifier / (target - this.initial);
    }
    relativeDedication(effort) {
        if (!this.time_estimate) {
            return 0;
        }
        if (!effort.time_spent) {
            return 0;
        }
        return effort.time_spent / this.time_estimate;
    }
    get report() {
        if (!this.monthly) {
            this.monthly = {};
            this.efforts.forEach(effort => {
                const month = effort.date.toJSON().slice(0, 7);
                if (!this.monthly[month]) {
                    this.monthly[month] = {
                        total_time: 0,
                        total_money: 0,
                        total_thought: 0,
                        total_thew: 0,
                        completion: 0,
                        dedication: 0,
                    };
                }
                this.monthly[month].total_time += effort.time_spent;
                this.monthly[month].total_money += effort.money_spent;
                this.monthly[month].total_thought += effort.thought_spent;
                this.monthly[month].total_thew += effort.thew_spent;
                this.monthly[month].completion += this.relativeCompletion(effort);
                this.monthly[month].dedication += this.relativeDedication(effort);
            });
        }
        return {
            monthly: this.monthly
        };
    }
    addEffort(effort) {
        this.clearCache();
        this.efforts.push(effort);
    }
    clearCache() {
        delete this.cached_current;
        delete this.cached_total_time;
        delete this.monthly;
    }
    get parent() {
        return this.cached_parent;
    }
}
//# sourceMappingURL=result.js.map