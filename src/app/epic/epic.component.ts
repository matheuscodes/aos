import { Component, Input, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';

function sum(a,b) {return a+b}
function avg(a,b,c,d) {return a+(b/d.length)}
function relativiness(reference) {
  return function(a) {return a/reference}
}
const minToHour = relativiness(60)
Array.prototype.accumulate = function(fn) {
    if(this.length > 0) {
      var r = [this[0]];
      this.reduce(function(a, b) {
        return r[r.length] = fn(a, b);
      });
      return r;
    }
    return this;
}

@Component({
  selector: 'app-epic',
  templateUrl: './epic.component.html',
  styleUrls: ['./epic.component.css']
})
export class EpicComponent implements OnInit {
  @ViewChild('epicChart',{static: false}) chart: ElementRef;

  @Input() epic: any;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() { this.createChart() }


  createChart() {
    const keys = Object.keys(this.epic.report.monthly).sort();
    const time = keys.map(i => this.epic.report.monthly[i].total_time).map(minToHour)
    const completions = keys.map(i => this.epic.report.monthly[i].completion).accumulate(sum).map(relativiness(0.01))
    const dedications = keys.map(i => this.epic.report.monthly[i].dedication).accumulate(sum).map(relativiness(0.01))

    const ctx = this.chart.nativeElement.getContext('2d');
    const revenueLineChart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'line',

      // The data for our dataset
      data: {
          labels: keys,
          datasets: [{
              label: 'Time Spent',
              // backgroundColor: 'rgba(255, 99, 132,0.1)',
              // borderColor: 'rgb(255, 99, 132)',
              data: time
          },{
              label: 'Completion',
              // backgroundColor: 'rgba(255, 99, 132,0.1)',
              // borderColor: 'rgb(255, 99, 132)',
              data: completions
          },{
              label: 'Dedications',
              // backgroundColor: 'rgba(255, 99, 132,0.1)',
              // borderColor: 'rgb(255, 99, 132)',
              data: dedications
          }]
      },

      // Configuration options go here
      options: {}
    });
  }
}
