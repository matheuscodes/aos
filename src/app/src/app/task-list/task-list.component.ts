import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  tasks;
  closeResult;

  constructor(
    private taskService: TaskService,
    private modalService: NgbModal
  ) {}

   ngOnInit() { }

   getTasks() {
     return this.taskService.getTasks();
   }

   open(content) {
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
        console.log(this.closeResult);
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        console.log(this.closeResult);
      });
    }

    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return  `with: ${reason}`;
      }
    }

}
