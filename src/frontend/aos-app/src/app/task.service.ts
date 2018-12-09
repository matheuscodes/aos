import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class TaskService {

  tasks;
  httpOptions;
  tasksUrl: string;

  priorities = [
    'trivial','normal','important','critical'
  ]

  statuses = [
    'open', 'postponed', 'done'
  ]

  constructor(private http: HttpClient) {
    this.tasksUrl = "http://192.168.99.100:8080/tasks";
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    this.refresh();
  }

  getTasks() {
    return this.tasks;
  }

  addTask(task) {
    return this.http.post(this.tasksUrl, task, this.httpOptions);
  }


  refresh() {
    this.tasks = [];
    this.http.get(this.tasksUrl)
             .subscribe(list => {
               // TODO validate list DTO
               if(Array.isArray(list)){
                 list.forEach(item => {
                   const data = item;
                   data.createdAt = new Date(item.createdAt);
                   data.updatedAt = new Date(item.updatedAt);
                   data.dueDate = new Date(item.dueDate);
                   this.tasks.push(data);
                 });
               } else {
                 throw new Error('Unexpected result from parsing.');
               }
             });
  }

}
