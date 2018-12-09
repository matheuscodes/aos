import { Component } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'aos-app';
  closeResult: string;

  constructor(private modalService: NgbModal) {}

  newTask(content) {
     this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
       this.closeResult = `Closed with: ${result}`;
       // Save draft?
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
