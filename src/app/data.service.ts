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
  tasksUrl: string;

  yearly;
  purposes;

  constructor(private http: HttpClient) {
    this.yearly = {};
    this.tasksUrl = "http://localhost:4200/assets/clean.json";
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

  refresh() {
    this.purposes = {};
    this.yearly = {};
    this.http.get(this.tasksUrl)
             .subscribe(data => {
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
