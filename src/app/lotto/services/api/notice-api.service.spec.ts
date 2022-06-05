import { TestBed } from '@angular/core/testing';

import { NoticeApiService } from './notice-api.service';

describe('NoticeApiService', () => {
  let service: NoticeApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoticeApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
