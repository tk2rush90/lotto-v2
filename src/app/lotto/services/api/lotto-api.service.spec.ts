import { TestBed } from '@angular/core/testing';

import { LottoApiService } from './lotto-api.service';

describe('LottoApiService', () => {
  let service: LottoApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LottoApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
