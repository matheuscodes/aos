import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import Purpose from '../services/purpose';

let id = 1;

@Injectable({
  providedIn: 'root'
})
export class DataService {

  data;
  httpOptions;
  purposesUrl: string;

  yearly;
  purposes;

  constructor(private http: HttpClient) {
    this.yearly = {};
    this.purposesUrl = "http://localhost:3000/users/local";
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
      error: console.log, // TODO handle error and retries.
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
                       if(!this.yearly[this.purposes[p].epics[e].objectives[o].due_date.toJSON().substr(0,4)]) {
                         this.yearly[this.purposes[p].epics[e].objectives[o].due_date.toJSON().substr(0,4)] = []
                       }
                       this.yearly[this.purposes[p].epics[e].objectives[o].due_date.toJSON().substr(0,4)].push(this.purposes[p].epics[e].objectives[o]);
                     }
                   });
                 });
               });
             });
  }
}
