import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../data.service';
import Effort from '../../services/effort';
import { SummaryComponent } from '../summary/summary.component';
import { PurposeComponent } from '../purpose/purpose.component';
import { ObjectiveComponent } from '../objective/objective.component';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css'],
  standalone: true,
  imports: [CommonModule, SummaryComponent, PurposeComponent, ObjectiveComponent]
})
export class OverviewComponent {
  @ViewChild('revenueLineChart',{static: false}) chart: ElementRef;

  downloadedData: any

  queuedEfforts: any[]

  data: any[] = []

  private dataService = inject(DataService);

  constructor() {
    this.queuedEfforts = []
  }

  getData() {
    const data = this.dataService.getData();
    if (data) {
      Object.keys(data).forEach(i => {
        if(!this.data.map(i => i.uuid).includes(i))
          this.data.push(data[i])
      });
    }
    return data;
  }

  getDataArray() {
    return this.data;
  }

  getYearly() {
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
