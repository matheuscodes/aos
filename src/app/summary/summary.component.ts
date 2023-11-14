import Plotly from 'plotly.js-dist'
import { Component, Input, OnInit, ElementRef, ViewChild } from '@angular/core';

import Purpose from '../../services/purpose';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  @ViewChild('summaryRadialChart', {static: false}) summaryRadialChart: ElementRef;

  @Input() everything: any;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if(this.everything && this.summaryRadialChart) {
      this.updateChart();
    }
  }

  updateChart() {
    const ids = [];
    const labels = [];
    const parents = [];
    this.everything.forEach(purpose => {
      ids.push(purpose.uuid);
      labels.push(purpose.definition);
      parents.push("");
      Object.keys(purpose.epics).forEach(eKey => {
        const epic = purpose.epics[eKey];
        ids.push(epic.uuid);
        labels.push(epic.title);
        parents.push(purpose.uuid);
        Object.keys(epic.objectives).forEach(oKey => {
          const objective = epic.objectives[oKey];
          ids.push(objective.uuid);
          labels.push(objective.title);
          parents.push(epic.uuid);
        });
      });
    });

    var data = [{

      type: "sunburst",

      ids,

      labels,

      parents,

      outsidetextfont: {size: 20, color: "#377eb8"},

      // leaf: {opacity: 0.4},

      textposition: 'inside',

      insidetextorientation: 'radial',
      marker: {line: {width: 2}},

    }];

    console.log(data)
    var layout = {
      height: 1024,

      margin: {l: 0, r: 0, b: 0, t:0},

      sunburstcolorway:[],
      extendsunburstcolorway: true
    };

    Plotly.newPlot( this.summaryRadialChart.nativeElement, data, layout);
  }
}
