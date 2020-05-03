import Effort from './effort'
import Result from './result'
import Objective from './objective'

class EffortRow {
  effort: Effort;
  result: Result;
  objective: Objective;

  constructor(effort: Effort, result: Result, objective: Objective) {
    this.effort = effort;
    this.result = result;
    this.objective = objective;
  }
}

export default class Efforts {

  table: EffortRow[];

  constructor() {
    this.table = [];
  }

  addEffort(effort: Effort, result: Result, objective: Objective) {
    this.table.push(new EffortRow(effort,result,objective));
  }

}
