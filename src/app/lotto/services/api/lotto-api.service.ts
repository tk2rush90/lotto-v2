import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiBaseService} from '@tk-ui/services/common/api-base.service';
import {Observable} from 'rxjs';
import {LottoResult} from '@lotto/models/lotto-result';

@Injectable({
  providedIn: 'root'
})
export class LottoApiService extends ApiBaseService {

  constructor(
    private http: HttpClient,
  ) {
    super();
  }

  /**
   * Get the lotto results.
   */
  getLottoResults(): Observable<LottoResult[]> {
    return this.http.get<LottoResult[]>(this.endpoint('/results'));
  }
}
