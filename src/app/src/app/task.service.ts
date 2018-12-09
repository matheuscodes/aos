import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Task } from './task';

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

  addTask(task: Task) {
    console.log(task);
    task.validate();
    console.log(this.tasksUrl, task, this.httpOptions);
    return this.http.post(this.tasksUrl, task, this.httpOptions)
                    .pipe(
                      catchError(this.handleError)
                    )
                    .subscribe(() => this.refresh());
  }

  saveTask(task: Task) {
    task.validate();
    console.log(`${this.tasksUrl}/${task.id}`, task, this.httpOptions);
    return this.http.put(`${this.tasksUrl}/${task.id}`, task, this.httpOptions)
                    .pipe(
                      catchError(this.handleError)
                    )
                    .subscribe(() => this.refresh());
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      alert('An error occurred:' + error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      alert(`Backend returned code ${error.status}.`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  };

  refresh() {
    this.tasks = [];
    this.http.get(this.tasksUrl)
             .subscribe(list => {
               if(Array.isArray(list)){
                 list.forEach(item => {
                   const data = item;
                   if(item.createdAt) {
                     data.createdAt = new Date(item.createdAt);
                   }
                   if(item.updatedAt) {
                     data.updatedAt = new Date(item.updatedAt);
                   }
                   if(item.dueDate) {
                     data.dueDate = new Date(item.dueDate);
                   }
                   this.add(<Task>(data))
                 });
               } else {
                 throw new Error('Unexpected result from parsing.');
               }
             });
  }

  private add(item: Task) {
    this.tasks.push(item);
  }

}
