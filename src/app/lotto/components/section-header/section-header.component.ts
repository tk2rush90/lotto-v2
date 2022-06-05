import {Component, EventEmitter, Input, Output} from '@angular/core';

/**
 * The header for each section.
 * It can include `action` button which is placed on the right of header.
 */
@Component({
  selector: 'app-section-header',
  templateUrl: './section-header.component.html',
  styleUrls: ['./section-header.component.scss']
})
export class SectionHeaderComponent {
  /**
   * The action name.
   */
  @Input() action = '';

  /**
   * Action click emitter.
   */
  @Output() actionClick = new EventEmitter<void>();

  /**
   * Emit action click.
   */
  emitActionClick(): void {
    this.actionClick.emit();
  }
}
