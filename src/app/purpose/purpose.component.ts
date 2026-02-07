import { Component, Input } from '@angular/core';

import { KeyValuePipe } from '@angular/common';
import { EpicComponent } from '../epic/epic.component';

@Component({
    selector: 'app-purpose',
    templateUrl: './purpose.component.html',
    styleUrls: ['./purpose.component.css'],
    imports: [
      KeyValuePipe,
      EpicComponent,
    ],
})
export class PurposeComponent {

  @Input() purpose: any;

  constructor() { }

}
