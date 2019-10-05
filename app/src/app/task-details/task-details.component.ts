import { Component, OnInit, Input } from '@angular/core';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {NgbDateAdapter, NgbDateStruct, NgbDateNativeAdapter} from '@ng-bootstrap/ng-bootstrap';

import { TaskService } from '../task.service';

import { Task } from '../task';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css'],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})
export class TaskDetailsComponent implements OnInit {

  @Input() task: object;

  constructor(
    private taskService: TaskService,
    private modalService: NgbModal
  ) {  }

  ngOnInit() {
  }

  submitUpdate(data) {
    console.log('Saving', data);
    try {
      this.taskService.saveTask(data);
      alert('Your task is being saved...');
    } catch(e) {
      alert(e.message);
    }
  }
  submitNew(data) {
    console.log('Creating', data);
    try {
      this.taskService.addTask(new Task(data));
      this.task = {};
      alert('Your task is being created...');
    } catch(e) {
      alert(e.message);
    }
  }

   getStatuses() {
     return this.taskService.statuses;
   }

   getPriorities() {
     return this.taskService.priorities;
   }

}
