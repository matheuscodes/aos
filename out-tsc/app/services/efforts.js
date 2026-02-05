class EffortRow {
    constructor(effort, result, objective) {
        this.effort = effort;
        this.result = result;
        this.objective = objective;
    }
}
export default class Efforts {
    constructor() {
        this.table = [];
    }
    addEffort(effort, result, objective) {
        this.table.push(new EffortRow(effort, result, objective));
    }
}
//# sourceMappingURL=efforts.js.map