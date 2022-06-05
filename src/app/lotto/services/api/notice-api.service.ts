import {Injectable} from '@angular/core';
import {ApiBaseService} from '@tk-ui/services/common/api-base.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Notice} from '@lotto/models/notice';
import {Observable} from 'rxjs';
import {PlatformService} from '@tk-ui/services/universal/platform.service';

const {
  assets,
} = environment;

/**
 * The service to communicate with local `/assets/notices` directory to get notices.
 */
@Injectable({
  providedIn: 'root'
})
export class NoticeApiService extends ApiBaseService {
  constructor(
    private http: HttpClient,
    private platformService: PlatformService,
  ) {
    super(assets + '/notices', platformService.isBrowser ? '' : 'http://localhost:4000');
  }

  /**
   * Get all notices.
   */
  getNotices(): Observable<Notice[]> {
    return this.http.get<Notice[]>(this.endpoint('/notices.json'));
  }
}
