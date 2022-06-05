import {Component, HostBinding, Input} from '@angular/core';
import {RandomStrategyValue} from '@lotto/components/random-options/random-options.component';
import {RippleColor, RippleDirective} from '@tk-ui/components/ripple/ripple.directive';

export interface RandomStrategyOption {
  value: RandomStrategyValue;
  name: string;
  description: string;
}

/**
 * The option item for random options.
 */
@Component({
  selector: 'app-random-option',
  templateUrl: './random-option.component.html',
  styleUrls: ['./random-option.component.scss']
})
export class RandomOptionComponent extends RippleDirective {
  /**
   * The option data.
   */
  @Input() data!: RandomStrategyOption;

  /**
   * Selected state.
   */
  @Input() @HostBinding('class.selected') selected = false;

  /**
   * FIx ripple color as `white`.
   */
  override get rippleColor(): RippleColor {
    return 'white';
  }
}
