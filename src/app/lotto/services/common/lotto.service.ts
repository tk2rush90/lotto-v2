import {Injectable} from '@angular/core';
import {LottoResult} from '@lotto/models/lotto-result';
import {BehaviorSubject, combineLatest, Subscription} from 'rxjs';
import {RandomUtil} from '@tk-ui/utils/random.util';
import {LottoUtil} from '@lotto/utils/lotto.util';
import {StorageService} from '@tk-ui/services/common/storage.service';

export const LAST_SELECTED_NUMBERS = 'LAST_SELECTED_NUMBERS';
export const LAST_SELECTED_SORT = 'LAST_SELECTED_SORT';
export const LAST_SELECTED_LOGIC = 'LAST_SELECTED_LOGIC';

export type ChosenStatisticsSort = 'number' | 'occurrence';
export type DrawLogic = 'default' | 'weighted';

@Injectable({
  providedIn: 'root'
})
export class LottoService {
  // Historical lotto results.
  private _results$: BehaviorSubject<LottoResult[]> = new BehaviorSubject<LottoResult[]>([]);

  // Selected numbers.
  private _selectedNumbers$: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);

  constructor(
    private storageService: StorageService,
  ) {
  }

  // The results that can be used in this service.
  private _results: LottoResult[] = [];

  /**
   * Set the lotto results to service.
   * @param results Lotto results.
   */
  set results(results: LottoResult[]) {
    this._results$.next(results);
    this._results = results;
  }

  /**
   * Set the selected numbers to service.
   * @param numbers Selected numbers.
   */
  set selectedNumbers(numbers: number[]) {
    this._selectedNumbers$.next(numbers);
  }

  /**
   * Get last selected numbers.
   */
  get lastSelectedNumbers(): number[] {
    const numbers = this.storageService.getFromLocal<number[]>(LAST_SELECTED_NUMBERS);

    return numbers ? numbers : [];
  }

  /**
   * Set last selected numbers.
   * @param numbers Selected numbers.
   */
  set lastSelectedNumbers(numbers: number[]) {
    this.storageService.setToLocal(LAST_SELECTED_NUMBERS, numbers);
  }

  /**
   * Get last selected sort.
   */
  get lastSelectedSort(): ChosenStatisticsSort {
    const sort = this.storageService.getFromLocal<ChosenStatisticsSort>(LAST_SELECTED_SORT);

    return sort ? sort : 'number';
  }

  /**
   * Set last selected sort.
   * @param sort Selected sort.
   */
  set lastSelectedSort(sort: ChosenStatisticsSort) {
    this.storageService.setToLocal(LAST_SELECTED_SORT, sort);
  }


  /**
   * Get last selected logic.
   */
  get lastSelectedLogic(): DrawLogic {
    const logic = this.storageService.getFromLocal<DrawLogic>(LAST_SELECTED_LOGIC);

    return logic ? logic : 'default';
  }

  /**
   * Set last selected logic.
   * @param logic Selected logic.
   */
  set lastSelectedLogic(logic: DrawLogic) {
    this.storageService.setToLocal(LAST_SELECTED_LOGIC, logic);
  }

  /**
   * Subscribe the lotto results.
   * @param handler Observable handler.
   */
  subscribeResults(handler: (results: LottoResult[]) => void): Subscription {
    return this._results$.asObservable().subscribe(handler);
  }

  /**
   * Subscribe the selected numbers.
   * @param handler Observable handler.
   */
  subscribeSelectedNumbers(handler: (numbers: number[]) => void): Subscription {
    return this._selectedNumbers$.asObservable().subscribe(handler);
  }

  /**
   * Subscribe both results and numbers.
   * @param handler Observable handler.
   */
  subscribeResultsAndSelectedNumbers(handler: (response: { results: LottoResult[], numbers: number[] }) => void): Subscription {
    return combineLatest([
      this._results$,
      this._selectedNumbers$,
    ]).subscribe(res => {
      const response = {
        results: res[0],
        numbers: res[1],
      };

      handler(response);
    });
  }

  /**
   * Default logic will get numbers as same chances.
   */
  drawNumbersByDefaultLogic(): number[] {
    const numbers = LottoUtil.getNumbers();
    const drawnNumbers: number[] = [];

    while (drawnNumbers.length < 6) {
      const index = RandomUtil.number(0, numbers.length);
      const deleted = numbers.splice(index, 1);

      drawnNumbers.push(...deleted);
    }

    return drawnNumbers;
  }

  /**
   * Draw the numbers by weighted logic.
   * See the description from `LottoUtil.getWeightedProbabilities()` method.
   */
  drawNumbersByWeightedLogic(): number[] {
    const numbers = LottoUtil.getNumbers();
    const drawnNumbers: number[] = [];

    while (drawnNumbers.length < 6) {
      const probabilities = LottoUtil.getWeightedProbabilities(this._results, numbers);
      const random = Math.random();

      // Find the number index that ranged in the probability.
      const index = numbers.findIndex((num, index) => {
        const previous = index === 0 ? 0 : probabilities[numbers[index - 1]];
        const current = probabilities[num];

        return previous < random && random <= current;
      });

      // Remove the found number from the numbers because each test should be independent,
      // we need to calculate the probabilities again with remaining numbers.
      if (index !== -1) {
        const found = numbers.splice(index, 1);

        drawnNumbers.push(...found);
      }
    }

    return drawnNumbers;
  }
}
