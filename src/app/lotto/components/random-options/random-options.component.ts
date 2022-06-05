import {Component, Optional, Self} from '@angular/core';
import {CustomFormControl} from '@tk-ui/bases/custom-form-control/custom-form-control.directive';
import {NgControl} from '@angular/forms';
import {RandomStrategyOption} from '@lotto/components/random-options/random-option/random-option.component';

/**
 * Value for random strategy.
 */
export type RandomStrategyValue = 'random' | 'most-weighted' | 'least-weighted';

/**
 * The options for auto selecting strategy.
 * It contains `random`, `most-weighted`, and `least-weighted` strategies.
 */
@Component({
  selector: 'app-random-options',
  templateUrl: './random-options.component.html',
  styleUrls: ['./random-options.component.scss']
})
export class RandomOptionsComponent extends CustomFormControl<RandomStrategyValue> {
  /**
   * The value.
   */
  value: RandomStrategyValue = 'random';

  /**
   * The options.
   */
  options: RandomStrategyOption[] = [
    {
      value: 'random',
      name: '랜덤',
      description: '모든 번호를 동일한 확률로 추첨',
    },
    {
      value :'most-weighted',
      name: '최다 가중',
      description: '기간 내 많이 나온 번호를 더 높은 확률로 추첨',
    },
    {
      value: 'least-weighted',
      name: '최소 가중',
      description: '기간 내 적게 나온 번호를 더 높은 확률로 추첨',
    },
  ];

  constructor(
    @Self() @Optional() public override ngControl: NgControl,
  ) {
    super(ngControl);
  }

  /**
   * Write value to component.
   * @param value - The value.
   */
  override writeValue(value: RandomStrategyValue): void {
    this.value = value;
  }
}
