import { Component, Input, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
// Using auto import for v4 which includes all necessary registrations
import { Chart } from 'chart.js/auto';

declare global {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Array<T> {
        accumulate(fn: any): any;
    }
}


function sum(a,b) {return a+b}
function relativiness(reference) {
  return function(a) {return a/reference}
}
const minToHour = relativiness(60)
Array.prototype.accumulate = function(fn) {
    if(this.length > 0) {
      const r = [this[0]];
      this.reduce(function(a, b) {
        return r[r.length] = fn(a, b);
      });
      return r;
    }

    return this;
}

@Component({
  selector: 'app-objective',
  templateUrl: './objective.component.html',
  styleUrls: ['./objective.component.css'],
  standalone: false
})
export class ObjectiveComponent implements AfterViewInit {
  @ViewChild('objectiveChart',{static: false}) chart: ElementRef;

  @Input() objective: any;

  constructor() { }

  ngAfterViewInit() { this.createChart() }

  createChart() {
    const keys = Object.keys(this.objective.report.monthly).sort();
    const time = keys.map(i => this.objective.report.monthly[i].total_time).map(minToHour)
    if(this.objective.results) {
      const completions = keys.map(i => this.objective.report.monthly[i].completion).accumulate(sum).map(relativiness(0.01))
      const dedications = keys.map(i => this.objective.report.monthly[i].dedication).accumulate(sum).map(relativiness(0.01))
      const ctx = this.chart.nativeElement.getContext('2d');
      
      // Build chart configuration for v4 API
      const leftAxisConfig = {
        type: 'linear',
        position: 'left',
        ticks: { min: 0 }
      };
      
      const rightAxisConfig = {
        type: 'linear', 
        position: 'right',
        grid: { display: false },
        ticks: { min: 0 }
      };
      
      const chartConfig = {
        type: 'line' as const,
        data: {
          labels: keys,
          datasets: [{
            label: 'Time Spent',
            yAxisID: 'left-y-axis',
            data: time,
            type: 'bar' as const
          },{
            label: 'Completion',
            yAxisID: 'right-y-axis',
            data: completions
          },{
            label: 'Dedications',
            yAxisID: 'right-y-axis',
            data: dedications
          }]
        },
        options: {
          scales: {
            'left-y-axis': leftAxisConfig,
            'right-y-axis': rightAxisConfig
          }
        }
      };
      
      new Chart(ctx, chartConfig as any);
    }
  }
}
