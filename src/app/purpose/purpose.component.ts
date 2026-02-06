import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EpicComponent } from '../epic/epic.component';

@Component({
  selector: 'app-purpose',
  templateUrl: './purpose.component.html',
  styleUrls: ['./purpose.component.css'],
  standalone: true,
  imports: [CommonModule, EpicComponent]
})
export class PurposeComponent {

  @Input() purpose: any;
  
  constructor() { }

}
