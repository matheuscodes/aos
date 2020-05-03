import Result from './result'
import Efforts from './efforts'
import { Report, PeriodReport, ReportUnit } from './report'

export interface ObjectiveResults {
    [results: string] : Result;
}

export default class Objective {
  uuid: UUIDType;
  title: string;
  time_planned: number; //minutes
  due_date: Date;
  results: ObjectiveResults;

  private cached_total_time: number;
  private cached_completion_sum: number;

  private monthly: PeriodReport;

  private cached_efforts: Efforts;

  constructor(data: any) {
    this.uuid = data.uuid;
    this.title = data.title;
    this.time_planned = data.time_planned;
    this.due_date = new Date(data.due_date);
    this.results = {}
    if(data.results) {
      Object.keys(data.results).forEach(key => {
        this.results[key] = new Result(data.results[key]);
      })
    }
  }

  get total_time(): number {
    if(!this.cached_total_time) {
      this.cached_total_time = 0;
      Object.keys(this.results).forEach(key => this.cached_total_time += this.results[key].total_time)
    }
    return this.cached_total_time;
  }

  get completion(): number {
    if(!this.cached_completion_sum) {
      this.cached_completion_sum = 0;
      Object.keys(this.results).forEach(key => this.cached_completion_sum += this.results[key].completion)
    }
    return this.cached_completion_sum / Object.keys(this.results).length;
  }

  private relativeCompletion(report: ReportUnit): number {
    return report.completion / Object.keys(this.results).length
  }

  private relativeDedication(report: ReportUnit): number {
    return report.dedication / Object.keys(this.results).length
  }

  get report(): Report {
    if(!this.monthly) {
      this.monthly = {}
      Object.keys(this.results).forEach(key => {
        const result = this.results[key];
        Object.keys(result.report.monthly).forEach(month => {
          if(!this.monthly[month]) {
            this.monthly[month] = JSON.parse(JSON.stringify(result.report.monthly[month]));
            this.monthly[month].completion = 0;
            this.monthly[month].dedication = 0;
          } else {
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
    }
  }

  get efforts(): Efforts {
    if(!this.cached_efforts) {
      this.cached_efforts = new Efforts();
      Object.keys(this.results).forEach(key => {
        const result = this.results[key];
        result.efforts.forEach(effort => {
          this.cached_efforts.addEffort(effort,result,this);
        });
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
}
