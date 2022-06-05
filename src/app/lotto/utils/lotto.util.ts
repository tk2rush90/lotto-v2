import {LottoResult} from '@lotto/models/lotto-result';
import {ObjectUtil} from '@tk-ui/utils/object.util';
import {LoggerUtil} from '@tk-ui/utils/logger.util';
import {ObjectMap} from '@tk-ui/others/types';

/**
 * The ball color for number.
 * - yellow: 1 to 10
 * - blue: 11 to 20
 * - red: 21 to 30
 * - grey: 31 to 40
 * - green: 41 to 45
 */
export type BallColor = 'yellow' | 'blue' | 'red' | 'grey' | 'green';

/**
 * Interface to create balls to the view for numbers.
 */
export interface LottoBall {
  /**
   * The value of selected number.
   */
  value: number;

  /**
   * The ball color for selected number.
   */
  color: BallColor;
}

/**
 * The result object for getting occurrences.
 */
export interface LottoOccurrenceResult {
  /**
   * Occurrence number array.
   * Each index indicates lotto number.
   * Each value indicates occurrence counts.
   */
  occurrences: number[];

  /**
   * The total occurrence
   */
  total: number;
}

/**
 * The utilities for lotto.
 * The methods that are not depended on `LottoHistoryService` are in here.
 */
export class LottoUtil {
  /**
   * Logger.
   */
  private static _logger = LoggerUtil.createLogger(this);

  /**
   * Get the counter array for chances or occurrence counter.
   */
  static get counterArray(): number[] {
    return new Array(45).fill(0, 0, 45);
  }

  /**
   * Create an array of `LottoBall` to display balls.
   * @param numbers - The numbers to create balls.
   */
  static createBalls(numbers: number[]): LottoBall[] {
    return numbers.map(num => {
      let color: BallColor;

      if (num > 0 && num < 11) {
        color = 'yellow';
      } else if (num > 10 && num < 21) {
        color = 'blue';
      } else if (num > 20 && num < 31) {
        color = 'red';
      } else if (num > 30 && num < 41) {
        color = 'grey';
      } else {
        color = 'green';
      }

      return {
        color,
        value: num,
      };
    });
  }

  /**
   * Get random numbers with normal chances.
   */
  static getRandomNumbers(): number[] {
    this._logger.debug('Start select numbers with random chances');

    const selectedNumbers: number[] = [];

    while (selectedNumbers.length < 6) {
      const chances = this._getNormalChances(selectedNumbers);

      this._logger.debug('Random chances', chances);

      selectedNumbers.push(this._selectNumberWithChances(chances));

      this._logger.debug('Selected numbers', selectedNumbers);
    }

    return selectedNumbers;
  }

  /**
   * Get the numbers with the most weighted chances.
   * @param results - The previous results for reference.
   * @param includeBonus - Set `true` to use bonus value when calculating.
   */
  static getMostWeightedNumbers(results: LottoResult[], includeBonus: boolean): number[] {
    this._logger.debug('Start select numbers with most weighted chances');

    const selectedNumbers: number[] = [];

    while (selectedNumbers.length < 6) {
      const chances = this._getWeightedChances(results, includeBonus, false, selectedNumbers);

      this._logger.debug('Most weighted chances', chances);

      selectedNumbers.push(this._selectNumberWithChances(chances));

      this._logger.debug('Selected numbers', selectedNumbers);
    }

    return selectedNumbers;
  }

  /**
   * Get the numbers with the least weighted chances.
   * @param results - The previous results for reference.
   * @param includeBonus - Set `true` to use bonus value when calculating.
   */
  static getLeastWeightedNumbers(results: LottoResult[], includeBonus: boolean): number[] {
    this._logger.debug('Start select numbers with least weighted chances');

    const selectedNumbers: number[] = [];

    while (selectedNumbers.length < 6) {
      const chances = this._getWeightedChances(results, includeBonus, true, selectedNumbers);

      this._logger.debug('Least weighted chances', chances);

      selectedNumbers.push(this._selectNumberWithChances(chances));

      this._logger.debug('Selected numbers', selectedNumbers);
    }

    return selectedNumbers;
  }

  /**
   * Get occurrence counts and total occurrence.
   * @param results - The result for reference.
   * @param includeBonus - Set `true` to count bonus value as well.
   * @param excludedMap - The map of excluded numbers that aren't counted.
   */
  static getOccurrenceCounts(results: LottoResult[], includeBonus: boolean, excludedMap: ObjectMap<boolean> = {}): LottoOccurrenceResult {
    let total = 0;
    const occurrences = this.counterArray;

    // Count total number occurrences and each number occurrence.
    // Count bonus number as well when `includeBonus` is `true`.
    results.forEach(result => {
      result.numbers.forEach(num => {
        if (!excludedMap[num]) {
          // Reduce `1` to transform to index.
          occurrences[num - 1]++;
          total++;
        }
      });

      if (includeBonus) {
        if (!excludedMap[result.bonus]) {
          // Reduce `1` to transform to index.
          occurrences[result.bonus - 1]++;
          total++;
        }
      }
    });

    return {
      total,
      occurrences,
    };
  }

  /**
   * Get the chances which are equal to all numbers.
   * @param excludedNumbers - The numbers that are excluded.
   */
  private static _getNormalChances(excludedNumbers: number[]): number[] {
    const chances = this.counterArray;
    const chance = 1 / (45 - excludedNumbers.length);
    const excludedMap = ObjectUtil.getUniqueKeys(excludedNumbers);

    for (let i = 0; i < chances.length; i++) {
      const previousChance = chances[i - 1] || 0;

      // Transform index to a number.
      // Calculate chance range when the number is not excluded.
      if (excludedMap[i + 1]) {
        chances[i] = previousChance;
      } else {
        chances[i] = previousChance + chance;
      }
    }

    return this._getCorrectedChances(chances);
  }

  /**
   * Get the weighted chances.
   * @param results - The previous results for reference.
   * @param includeBonus - Set `true` to use bonus value when calculating.
   * @param leastWeighted - Set `true` to adjust the chance with least weighted.
   * @param excludedNumbers - The numbers that are excluded.
   */
  private static _getWeightedChances(results: LottoResult[], includeBonus: boolean, leastWeighted: boolean, excludedNumbers: number[]): number[] {
    // Calculate the most weighted chances.
    // The `total` is total number occurrence.
    // The `occurrences` will count occurrence for each number,
    // then calculate the weighted chance and set to `chances`.
    // The `randomChance` is default chance without any weights.
    const chances = this.counterArray;
    const randomChance = 1 / 45;
    const excludedMap = ObjectUtil.getUniqueKeys(excludedNumbers);
    const {total, occurrences} = this.getOccurrenceCounts(results, includeBonus, excludedMap);

    // Calculate chances.
    occurrences.forEach((count, index) => {
      const previousChance = chances[index - 1] || 0;

      // Transform index to a number.
      // Calculate chance range when the number is not excluded.
      if (excludedMap[index + 1]) {
        chances[index] = previousChance;
      } else {
        const chance = count / total;

        // When `leastWeighted` is `true`, add more chance to a number
        // which has less occurred than `randomChance`.
        if (leastWeighted) {
          const differ = randomChance - chance;

          chances[index] = previousChance + randomChance + differ;
        } else {
          chances[index] = previousChance + chance;
        }
      }
    });

    return this._getCorrectedChances(chances);
  }

  /**
   * Correct the chances array to make chances to be within 0 to 1.
   * @param chances - Chances to correct.
   */
  private static _getCorrectedChances(chances: number[]): number[] {
    // Get maximum value of chances to correct the chances to be within 0 to 1.
    const maximumChance = chances[chances.length - 1];

    return chances.map(chance => {
      // Correct the chances.
      return chance * (1 / maximumChance);
    });
  }

  /**
   * Select a number with chances.
   * @param chances - The chances for each number.
   */
  private static _selectNumberWithChances(chances: number[]): number {
    const random = Math.random();
    const num = chances.findIndex((chance, index) => {
      const previous = chances[index - 1] || 0;

      return previous <= random && random < chance;
    });

    // Transform index to a number.
    return num + 1;
  }
}
