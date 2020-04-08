import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { DataService } from '../data.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  @ViewChild('revenueLineChart',{static: false}) chart: ElementRef;

  downloadedData: any

  constructor(
    private dataService: DataService
  ) {}

  getData() {
    return this.dataService.getData();
  }

  getYearly() {
    return this.dataService.getYearly();
  }

  ngOnInit() {
  }

}
