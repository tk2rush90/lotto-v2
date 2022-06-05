import {Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable} from 'rxjs';
import {LottoResult} from '@lotto/models/lotto-result';
import {OptionItem} from '@tk-ui/models/option-item';
import {ObjectUtil} from '@tk-ui/utils/object.util';

/**
 * The winning counts for each prize.
 */
export interface LottoWinnings {
  /**
   * First prize.
   */
  1: number;

  /**
   * Second prize.
   */
  2: number;

  /**
   * Third prize.
   */
  3: number;

  /**
   * Forth prize.
   */
  4: number;

  /**
   * Fifth prize.
   */
  5: number;
}
/**
 * The service to manage lotto histories.
 */
@Injectable({
  providedIn: 'root'
})
export class LottoHistoryService {
  /**
   * The total lotto results.
   */
  private _results$ = new BehaviorSubject<LottoResult[]>([]);

  /**
   * The round options.
   */
  private _roundOptions$ = new BehaviorSubject<OptionItem<string>[]>([]);

  /**
   * Latest round number.
   */
  private _latestRound$ = new BehaviorSubject<number>(0);

  /**
   * Oldest round number.
   */
  private _oldestRound$ = new BehaviorSubject<number>(0);

  /**
   * Set lotto results.
   * @param results - The results.
   */
  set results(results: LottoResult[]) {
    this._results$.next(results);
    this._roundOptions$.next(results.map(result => new OptionItem<string>(`${result.round}회`, `${result.round}`)));
    this._latestRound$.next(results[results.length - 1].round);
    this._oldestRound$.next(results[0].round);
  }

  /**
   * Get lotto results as an observable.
   */
  get results$(): Observable<LottoResult[]> {
    return this._results$.asObservable();
  }

  /**
   * Get round options as an observable.
   */
  get roundOptions$(): Observable<OptionItem<string>[]> {
    return this._roundOptions$.asObservable();
  }

  /**
   * Get the latest round as an observable.
   */
  get latestRound$(): Observable<number> {
    return this._latestRound$.asObservable();
  }

  /**
   * Get the oldest round as an observable.
   */
  get oldestRound$(): Observable<number> {
    return this._oldestRound$.asObservable();
  }

  /**
   * Get ranged lotto results between starting round and ending round.
   * @param start - The starting round.
   * @param end - The ending round.
   */
  getRangedResults(start: number, end: number): Observable<LottoResult[]> {
    return this._results$.pipe(map(results => {
      return results.filter(result => result.round >= start && result.round <= end);
    }));
  }

  /**
   * Count winnings from the previous results with selected numbers.
   * @param selectedNumbers - The selected numbers.
   */
  countWinnings(selectedNumbers: number[]): LottoWinnings {
    const selectedNumbersMap = ObjectUtil.getUniqueKeys(selectedNumbers);
    const winnings: LottoWinnings = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };

    this._results$.value.forEach(result => {
      const matches = result.numbers.filter(num => selectedNumbersMap[num]);

      if (matches.length === 6) {
        winnings[1]++;
      } else if (matches.length === 5) {
        if (selectedNumbersMap[result.bonus]) {
          winnings[2]++;
        } else {
          winnings[3]++;
        }
      } else if (matches.length === 4) {
        winnings[4]++;
      } else if (matches.length === 3) {
        winnings[5]++;
      }
    });

    return winnings;
  }
}
