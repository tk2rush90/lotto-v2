import {LottoResult} from '@lotto/models/lotto-result';

export interface WinningResult {
  result: LottoResult;
  matched: { [k: number]: number };
  prize?: number;
}
