export default class Effort {
    constructor(data, parent) {
        this.date = new Date(data.date);
        if (this.date.toString() == "Invalid Date")
            throw new Error('Invalid Date');
        this.time = data.time;
        this.comment = data.comment;
        this.modifier = parseFloat(data.modifier) || 0;
        this.time_spent = parseInt(data.time_spent) || 0;
        this.money_spent = parseInt(data.money_spent) || 0;
        this.thought_spent = parseInt(data.thought_spent) || 0;
        this.thew_spent = parseInt(data.thew_spent) || 0;
        if (parent) {
            this.cached_parent = parent;
        }
    }
    get parent() {
        return this.cached_parent;
    }
}
//# sourceMappingURL=effort.js.map