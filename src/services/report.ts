export interface ReportUnit {
  total_time: number;
  total_money: number;
  total_thought: number;
  total_thew: number;
  dedication: number;
  completion: number;
}
export interface PeriodReport {
  [period: string]: ReportUnit;
}

export interface Report {
  monthly: PeriodReport;
}
