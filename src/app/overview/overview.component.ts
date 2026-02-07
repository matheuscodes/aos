import { Component, ElementRef, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import Effort from '../../services/effort'
import Epic from '../../services/epic'
import Purpose from '../../services/purpose'
import Objective from '../../services/objective'
import Result from '../../services/result'
import { Report } from '../../services/report'

type ReportType = {
  objective: Objective;
  epic: Epic;
  purpose: Purpose;
  previous: any;
  Q1: any;
  Q2: any;
  Q3: any;
  Q4: any;
}

type YearlyType = {
  [key: string]: {
    objectives: Objective[];
    report: {
      purposes: ReportType[];
      epics: ReportType[];
      objectives: ReportType[];
      previous: number;
    };
    year: string;
  }
};

type QueuedEffortType = {
  result?: Partial<Result>;
  objective?: Partial<Objective>;
  effort?: Partial<Effort>;
}

@Component({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.css'],
    standalone: false
})
export class OverviewComponent {
  @ViewChild('revenueLineChart',{static: false}) chart: ElementRef;

  downloadedData: any

  queuedEfforts: QueuedEffortType[]

  data: any[] = []

  constructor(
    private dataService: DataService
  ) {
    this.queuedEfforts = []
  }

  getData() {
    const data = this.dataService.getData();
    Object.keys(data).forEach(i => {
      if(!this.data.map(i => i.uuid).includes(i))
        this.data.push(data[i])
    });
    return data;
  }

  getDataArray() {
    return this.data;
  }
  getYearly(): YearlyType {
    return this.dataService.getYearly();
  }

  addQueuedEffort() {
    this.queuedEfforts.push({effort:{}});
  }

  selectObjective(test, effort, objectives) {
    const objectiveUUID = test.target.value;
    const objective = objectives.filter((o) => o.uuid == objectiveUUID)[0];
    effort.objective = objective;
  }

  selectResult(test, effort, results) {
    const resultUUID = test.target.value;
    const result = results[resultUUID];
    effort.result = result;
  }

  saveEfforts() {
    const failed = [];
    this.queuedEfforts.forEach(queuedEffort => {
      try {
        const createdEffort = new Effort(queuedEffort.effort, queuedEffort.result);
        queuedEffort.result.addEffort(createdEffort);
        this.dataService.clearCache();
      } catch(e) {
        console.log(e);
        failed.push(queuedEffort);
      }
    });
    this.dataService.submit();
    this.queuedEfforts = failed;
  }

}
