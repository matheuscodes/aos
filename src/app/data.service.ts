import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { signal } from '@angular/core';

import Purpose from '../services/purpose';
import YearPlan from '../services/year-plan';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private http = inject(HttpClient);

  data;
  httpOptions;
  purposesUrl: string;

  yearly;
  purposes = signal<{[key:string]:Purpose}>({}); // reactive signal

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
    this.yearly = {};
    this.http.get<any>(this.purposesUrl)
             .subscribe(response => {
               const data = response.purposes;
               const nextPurposes = {}
               Object.keys(data).forEach(key => {
                 nextPurposes[key] = new Purpose(data[key]);
               })
               Object.keys(nextPurposes).forEach(p => {
                 Object.keys(nextPurposes[p].epics).forEach(e => {
                   Object.keys(nextPurposes[p].epics[e].objectives).forEach(o => {
                     //Yearly
                     if(nextPurposes[p].epics[e].objectives[o].due_date) {
                       const year: number = parseInt(nextPurposes[p].epics[e].objectives[o].due_date.toJSON().substr(0,4));
                       if(!this.yearly[year]) {
                         this.yearly[year] = new YearPlan(year);
                       }
                       this.yearly[year].addObjective(nextPurposes[p].epics[e].objectives[o]);
                     }
                   });
                 });
               });
               this.purposes.set(nextPurposes);
             });
  }
}
