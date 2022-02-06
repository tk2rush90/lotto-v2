import {LottoResult} from '@lotto/models/lotto-result';
import {LottoProbability} from '@lotto/models/lotto-probability';
import {ParsingUtil} from '@tk-ui/utils/parsing.util';
import {OccurrenceStatistic} from '@lotto/models/occurrence-statistic';
import {ChosenStatisticsSort} from '@lotto/services/common/lotto.service';
import {SortUtil} from '@tk-ui/utils/sort.util';
import {WinningResult} from '@lotto/models/winning-result';

export class LottoUtil {
  /**
   * Get whole lotto numbers.
   */
  static getNumbers(): number[] {
    const numbers = [];

    for (let i = 1; i <= 45; i++) {
      numbers.push(i);
    }

    return numbers;
  }

  /**
   * Get the default probabilities according to previous occurrences.
   * @param results Results to calculate probabilities.
   * @param numbers Numbers that can be chosen. Default is all lotto numbers.
   */
  static getDefaultProbabilities(results: LottoResult[], numbers = this.getNumbers()): LottoProbability {
    const {total, occurrence} = this.getNumberOccurrences(results, numbers);

    // Calculate the probabilities.
    numbers.forEach((item, index) => {
      occurrence[item] = occurrence[item] / total;

      // If the last number, set the probability to `1`.
      if (index === numbers.length - 1) {
        occurrence[item] = 1;
      }
    });

    return occurrence;
  }

  /**
   * Get the weighted probability of each number from the results.
   * It assumes that the probability of each number converges to normal probability.
   * So when the current probability is less than normal, give more weight,
   * on the other hand, when the current probability is more than normal, give less weight.
   * @param results Lotto results.
   * @param numbers
   * The numbers that can be chosen. Each number should be chosen as independent.
   * So the numbers array should be different on every choosing.
   * Default is all lotto numbers.
   */
  static getWeightedProbabilities(results: LottoResult[], numbers = this.getNumbers()): LottoProbability {
    const {total, occurrence} = this.getNumberOccurrences(results, numbers);

    // Normal probability of each number.
    const normalProbability = 1 / numbers.length;

    // Calculate the weighted probabilities.
    numbers.forEach((item, index) => {
      const currentProbability = occurrence[item] / total;
      const diff = normalProbability - currentProbability;

      // Multiply diff to give more weight.
      occurrence[item] = currentProbability + (diff * 2);

      // If the last number, set the probability to `1`.
      // Each number can be chosen by the result of `Math.random()`,
      // so the last number should be `1`.
      // And if the number is not first number, add previous probability to
      // calculate the probability range between previous and current number.
      if (index === numbers.length - 1) {
        occurrence[item] = 1;
      } else if (index !== 0) {
        occurrence[item] += occurrence[numbers[index - 1]];
      }
    });

    return occurrence;
  }

  /**
   * Get the number occurrences with total counts.
   * @param results Results to calculate occurrences.
   * @param numbers Numbers that can be chosen. Default is all lotto numbers.
   */
  static getNumberOccurrences(results: LottoResult[], numbers = this.getNumbers()): {
    total: number;
    // Use same model with probability.
    occurrence: LottoProbability;
  } {
    const probability: LottoProbability = {};

    // Create map for numbers then loop the results to count each number.
    // The `total` is total counts of mapped numbers.
    // This will be used to get normal probability of each number.
    let total = 0;

    numbers.forEach(item => probability[item] = 0);
    results.forEach(item => {
      item.numbers.forEach(num => {
        if (probability.hasOwnProperty(num)) {
          probability[num]++;
          total++;
        }
      });

      if (probability.hasOwnProperty(item.bonus)) {
        probability[item.bonus]++;
        total++;
      }
    });

    return {
      total,
      occurrence: probability,
    };
  }

  /**
   * Get the winnings result with selected numbers.
   * The result is number array that contains the counts of `1st prize` to `5th prize`.
   * @param results Historical winning results.
   * @param numbers Selected numbers.
   */
  static getWinningResults(results: LottoResult[], numbers: number[]): number[] {
    // Winnings array.
    // Most left number is the count of `1st prize`, most right number is the count of `5th prize`.
    const winnings: number[] = [0, 0, 0, 0, 0];
    const selectedMap: { [k: number]: number } = {};

    // Transform selected numbers array to map.
    numbers.forEach(item => selectedMap[item] = item);

    results.forEach(item => {
      const matched = this._getMatchedCounts(item, selectedMap);

      if (matched.matched === 6) {
        winnings[0]++;
      } else if (matched.matched === 5 && matched.bonus) {
        winnings[1]++;
      } else if (matched.matched === 5) {
        winnings[2]++;
      } else if (matched.matched === 4) {
        winnings[3]++;
      } else if (matched.matched === 3) {
        winnings[4]++;
      }
    });

    return winnings;
  }

  /**
   * Get the statistics of number occurrences.
   * @param results Historical lotto results.
   */
  static getNumberOccurrenceStatistics(results: LottoResult[]): OccurrenceStatistic[] {
    const occurrences: OccurrenceStatistic[] = [];
    const {total, occurrence} = LottoUtil.getNumberOccurrences(results);

    Object.keys(occurrence).forEach(key => {
      const num = ParsingUtil.toInteger(key);
      const count = occurrence[num];
      const _occurrence: OccurrenceStatistic = {
        count,
        number: num,
        // The occurrence will be calculated after.
        occurrence: 0,
        probability: count / total * 100,
      };

      occurrences.push(_occurrence);
    });

    // Calculate occurrences.
    const max = Math.max(...occurrences.map(item => item.count));

    occurrences.forEach(item => item.occurrence = item.count / max * 100);

    return occurrences;
  }

  /**
   * Sort the occurrences by sort field.
   * @param occurrences Occurrence statistics.
   * @param sort Sort field.
   */
  static sortOccurrenceStatistics(occurrences: OccurrenceStatistic[], sort: ChosenStatisticsSort): OccurrenceStatistic[] {
    let sortFunction;

    switch (sort) {
      case 'number': {
        sortFunction = SortUtil.sortMethodWithOrderByColumn<OccurrenceStatistic>({
          property: 'number',
          order: 'asc',
          type: 'number',
        });

        break;
      }

      case 'occurrence': {
        sortFunction = SortUtil.sortMethodWithOrderByColumn<OccurrenceStatistic>({
          property: 'occurrence',
          order: 'desc',
          type: 'number',
        });
      }
    }

    return occurrences.sort(sortFunction);
  }

  /**
   * Get the detailed winning results.
   * @param results Lotto results.
   * @param numbers Selected numbers.
   */
  static getDetailedWinningResults(results: LottoResult[], numbers: number[]): WinningResult[] {
    const winnings: WinningResult[] = [];
    const selectedMap: { [k: number]: number } = {};

    // Transform selected numbers array to map.
    numbers.forEach(item => selectedMap[item] = item);

    results.forEach(item => {
      let prize: number | undefined = undefined;
      const matched = this._getMatchedCounts(item, selectedMap);

      if (matched.matched === 6) {
        prize = 1;
      } else if (matched.matched === 5 && matched.bonus) {
        prize = 2;
      } else if (matched.matched === 5) {
        prize = 3;
      } else if (matched.matched === 4) {
        prize = 4;
      } else if (matched.matched === 3) {
        prize = 5;
      }

      winnings.push({
        result: item,
        matched: selectedMap,
        prize,
      });
    });

    return winnings;
  }

  /**
   * Get the matched counts of selected numbers for result.
   * @param result The lotto result to check matched count.
   * @param selectedMap The map of selected numbers.
   */
  private static _getMatchedCounts(result: LottoResult, selectedMap: { [k: number]: number }): {
    matched: number;
    bonus: boolean;
  } {
    const matched = {
      matched: 0,
      bonus: false,
    };

    result.numbers.forEach(item => {
      if (selectedMap[item]) {
        matched.matched++;
      }
    });

    matched.bonus = !!selectedMap[result.bonus];

    return matched;
  }
}
