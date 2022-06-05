/**
 * Lotto result item.
 */
export interface LottoResult {
  /**
   * The round number.
   */
  round: number;

  /**
   * The numbers for winner.
   */
  numbers: number[];

  /**
   * The bonus number.
   */
  bonus: number;
}
