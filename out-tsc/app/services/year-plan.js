export default class YearPlan {
    constructor(year) {
        this.objectives = [];
        this.year = year;
    }
    addObjective(objective) {
        if (!objective.due_date.toJSON().includes(`${this.year}`)) {
            throw new Error(`Cannot add objective not due to ${this.year}`);
        }
        this.objectives.push(objective);
    }
    get epics() {
        const epics = {};
        this.objectives.forEach(objective => epics[objective.parent.uuid] = objective.parent);
        return epics;
    }
    get purposes() {
        const epics = this.epics;
        const purposes = {};
        Object.keys(epics).forEach(key => purposes[epics[key].parent.uuid] = epics[key].parent);
        return purposes;
    }
    get report() {
        const epics = this.epics;
        const purposes = {};
        const report = {
            epics: [],
            purposes: [],
            objectives: [],
        };
        Object.keys(epics).forEach(key => {
            purposes[epics[key].parent.uuid] = epics[key].parent;
            report.epics.push({
                epic: epics[key],
                previous: {
                    completion: epics[key].completionTillMonth(`${this.year - 1}-12`),
                },
                Q1: {
                    completion: epics[key].completionTillMonth(`${this.year}-03`),
                },
                Q2: {
                    completion: epics[key].completionTillMonth(`${this.year}-06`),
                },
                Q3: {
                    completion: epics[key].completionTillMonth(`${this.year}-09`),
                },
                Q4: {
                    completion: epics[key].completionTillMonth(`${this.year}-12`),
                }
            });
        });
        Object.keys(purposes).forEach(key => {
            report.purposes.push({
                purpose: purposes[key],
                previous: {
                    completion: purposes[key].completionTillMonth(`${this.year - 1}-12`),
                },
                Q1: {
                    completion: purposes[key].completionTillMonth(`${this.year}-03`),
                },
                Q2: {
                    completion: purposes[key].completionTillMonth(`${this.year}-06`),
                },
                Q3: {
                    completion: purposes[key].completionTillMonth(`${this.year}-09`),
                },
                Q4: {
                    completion: purposes[key].completionTillMonth(`${this.year}-12`),
                }
            });
        });
        this.objectives.forEach(objective => {
            report.objectives.push({
                objective: objective,
                Q1: {
                    completion: objective.completionTillMonth(`${this.year}-03`),
                },
                Q2: {
                    completion: objective.completionTillMonth(`${this.year}-06`),
                },
                Q3: {
                    completion: objective.completionTillMonth(`${this.year}-09`),
                },
                Q4: {
                    completion: objective.completionTillMonth(`${this.year}-12`),
                }
            });
        });
        return report;
    }
}
//# sourceMappingURL=year-plan.js.map