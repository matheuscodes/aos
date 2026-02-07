import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-purpose',
    templateUrl: './purpose.component.html',
    styleUrls: ['./purpose.component.css'],
    standalone: false
})
export class PurposeComponent {

  @Input() purpose: any;
  
  constructor() { }

}
