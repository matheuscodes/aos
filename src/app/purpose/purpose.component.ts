import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-purpose',
  templateUrl: './purpose.component.html',
  styleUrls: ['./purpose.component.css'],
})
export class PurposeComponent {

  @Input() purpose: any;

  constructor() { }

}
