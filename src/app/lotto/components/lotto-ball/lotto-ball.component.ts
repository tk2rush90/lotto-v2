import {Component, HostBinding, Input} from '@angular/core';
import {LottoBall} from '@lotto/utils/lotto.util';

@Component({
  selector: 'app-lotto-ball',
  templateUrl: './lotto-ball.component.html',
  styleUrls: ['./lotto-ball.component.scss']
})
export class LottoBallComponent {
  /**
   * Selected ball data.
   */
  @Input() data!: LottoBall;

  /**
   * Bind disabled state to class.
   */
  @Input() @HostBinding('class.disabled') disabled = false;

  /**
   * Get and bind color attribute.
   */
  @HostBinding('attr.color')
  get color(): string {
    return this.data.color;
  }
}
