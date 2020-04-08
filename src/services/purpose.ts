import Epic from './epic';
import { Report, PeriodReport, ReportUnit } from './report'

declare global {
  type UUIDType = string;
}

export interface PurposeEpics {
    [epics: string] : Epic;
}

export default class Purpose {

  definition: string;

  uuid: UUIDType;

  epics: PurposeEpics;

  private cached_total_time: number;
  private cached_completion_sum: number;

  private monthly: PeriodReport;

  constructor(data: any) {
    this.uuid = data.uuid;
    this.definition = data.definition;
    this.epics = {};
    if(data.epics) {
      Object.keys(data.epics).forEach(key => {
        this.epics[key] = new Epic(data.epics[key]);
      })
    }
  }

  get total_time(): number {
    if(!this.cached_total_time) {
      this.cached_total_time = 0;
      Object.keys(this.epics).forEach(key => this.cached_total_time += this.epics[key].total_time)
    }
    return this.cached_total_time;
  }

  get completion(): number {
    if(!this.cached_completion_sum) {
      this.cached_completion_sum = 0;
      Object.keys(this.epics).forEach(key => this.cached_completion_sum += this.epics[key].completion)
    }
    return this.cached_completion_sum / Object.keys(this.epics).length;
  }

  private relativeCompletion(report: ReportUnit): number {
    return report.completion / Object.keys(this.epics).length
  }

  private relativeDedication(report: ReportUnit): number {
    return report.dedication / Object.keys(this.epics).length
  }

  get report(): Report {
    if(!this.monthly) {
      this.monthly = {}
      Object.keys(this.epics).forEach(key => {
        const epic = this.epics[key];
        Object.keys(epic.report.monthly).forEach(month => {
          if(!this.monthly[month]) {
            this.monthly[month] = JSON.parse(JSON.stringify(epic.report.monthly[month]));
            this.monthly[month].completion = 0;
            this.monthly[month].dedication = 0;
          } else {
            this.monthly[month].total_time += epic.report.monthly[month].total_time;
            this.monthly[month].total_money += epic.report.monthly[month].total_money;
            this.monthly[month].total_thought += epic.report.monthly[month].total_thought;
            this.monthly[month].total_thew += epic.report.monthly[month].total_thew;
          }
          this.monthly[month].completion += this.relativeCompletion(epic.report.monthly[month]);
          this.monthly[month].dedication += this.relativeDedication(epic.report.monthly[month]);
        });
      });
    }
    return {
      monthly: this.monthly
    }
  }
}
