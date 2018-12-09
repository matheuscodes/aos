import { Component, OnInit, Input } from '@angular/core';

import {NgbDateAdapter, NgbDateStruct, NgbDateNativeAdapter} from '@ng-bootstrap/ng-bootstrap';

import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css'],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})
export class TaskDetailsComponent implements OnInit {

  @Input() task: object;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
  }

  submitUpdate(data) {
    console.log(this.task);
    alert(`update\n${JSON.stringify(data,null,2)}`);
  }
  submitNew(data) {
    console.log(this.task);
    alert(`new\n${JSON.stringify(data,null,2)}`);
  }

   getStatuses() {
     return this.taskService.statuses;
   }

   getPriorities() {
     return this.taskService.priorities;
   }

}
