import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-labeled-checkbox',
  templateUrl: './labeled-checkbox.component.html',
  styleUrls: ['./labeled-checkbox.component.scss']
})
export class LabeledCheckboxComponent implements OnInit {
  // Checked state.
  @Input() checked = false;

  // Checked change emitter.
  @Output() checkedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Emit checked change with changed checked state.
   * @param event Mouse event.
   */
  @HostListener('click', ['$event'])
  onHostClick(event: MouseEvent): void {
    event.stopPropagation();

    this.checkedChange.emit(!this.checked);
  }
}
