import { Injectable, inject } from '@angular/core';
import { HttpClient,  HttpHeaders } from '@angular/common/http';

import Purpose from '../services/purpose';
import YearPlan from '../services/year-plan';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  data;
  httpOptions;
  purposesUrl: string;

  yearly;
  purposes: {[key: string]: Purpose};

  private http = inject(HttpClient);

  constructor() {
    this.yearly = {};
    this.purposesUrl = "http://localhost:3001/api/purposes";
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    this.refresh();
  }

  getData() {
    return this.purposes;
  }

  getYearly() {
    return this.yearly;
  }

  clearCache() {
     Object.keys(this.purposes).forEach(p => {
       this.purposes[p].clearCache();
     });
  }

  submit() {
    const seen = [];
    this.http.put(this.purposesUrl, {
      id: "local",
      purposes: JSON.parse(JSON.stringify(this.purposes, (key, val) => {
        if(key.includes("cached") || key.includes("monthly")) return
        if (typeof val == "object") {
          if (seen.indexOf(val) >= 0) return
          seen.push(val)
        }
        return val
      })),
    }).subscribe({
      next: console.log,
      error: console.error, // TODO handle error and retries.
    });
  }

  refresh() {
    this.purposes = {};
    this.yearly = {};
    this.http.get<any>(this.purposesUrl)
             .subscribe(response => {
               const data = response.purposes;
               Object.keys(data).forEach(key => {
                 this.purposes[key] = new Purpose(data[key]);
               })
               Object.keys(this.purposes).forEach(p => {
                 Object.keys(this.purposes[p].epics).forEach(e => {
                   Object.keys(this.purposes[p].epics[e].objectives).forEach(o => {
                     //Yearly
                     if(this.purposes[p].epics[e].objectives[o].due_date) {
                       const year: number = parseInt(this.purposes[p].epics[e].objectives[o].due_date.toJSON().substr(0,4));
                       if(!this.yearly[year]) {
                         this.yearly[year] = new YearPlan(year);
                       }
                       this.yearly[year].addObjective(this.purposes[p].epics[e].objectives[o]);
                     }
                   });
                 });
               });
             });
  }
}
