import {Injectable} from '@angular/core';
import {ApiBaseService} from '@tk-ui/services/common/api-base.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {map, Observable} from 'rxjs';
import {LottoResult} from '@lotto/models/lotto-result';
import {SortUtil} from '@tk-ui/utils/sort.util';

const {
  api,
} = environment;

/**
 * The service to communicate with lotto API.
 */
@Injectable({
  providedIn: 'root'
})
export class LottoApiService extends ApiBaseService {

  constructor(
    private http: HttpClient,
  ) {
    super('', api);
  }

  /**
   * Get total results for previous winner.
   */
  getResults(): Observable<LottoResult[]> {
    return this.http.get<LottoResult[]>(this.endpoint('/results'))
      .pipe(map(results => {
        // Order results with `round` by descending.
        const sortFunction = SortUtil.sortMethodWithOrderByColumn<LottoResult>({
          direction: 'desc',
          property: 'round',
          type: 'number',
        });

        return results.sort(sortFunction);
      }));
  }
}
