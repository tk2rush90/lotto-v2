import { TestBed } from '@angular/core/testing';

import { LottoHistoryService } from './lotto-history.service';

describe('LottoHistoryService', () => {
  let service: LottoHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LottoHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
