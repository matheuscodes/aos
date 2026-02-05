import { Component, Input, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';

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
  styleUrls: ['./objective.component.css']
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
      new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
          labels: keys,
          datasets: [{
            label: 'Time Spent',
            yAxisID: 'left-y-axis',
            // backgroundColor: 'rgba(255, 99, 132,0.1)',
            // borderColor: 'rgb(255, 99, 132)',
            data: time,
            type: 'bar'
          },{
            label: 'Completion',
            yAxisID: 'right-y-axis',
            // backgroundColor: 'rgba(255, 99, 132,0.1)',
            // borderColor: 'rgb(255, 99, 132)',
            data: completions
          },{
            label: 'Dedications',
            yAxisID: 'right-y-axis',
            // backgroundColor: 'rgba(255, 99, 132,0.1)',
            // borderColor: 'rgb(255, 99, 132)',
            data: dedications
          }]
        },
        options: {
            scales: {
                yAxes: [{
                    id: 'left-y-axis',
                    type: 'linear',
                    position: 'left',
                    ticks: {
                        min: 0,
                    }
                }, {
                    id: 'right-y-axis',
                    type: 'linear',
                    position: 'right',
                    gridLines: {
                      display: false
                    },
                    ticks: {
                        min: 0,
                    }
                }]
            }
        }
      });
    }
  }
}
