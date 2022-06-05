import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LottoWinningsComponent } from './lotto-winnings.component';

describe('LottoWinningsComponent', () => {
  let component: LottoWinningsComponent;
  let fixture: ComponentFixture<LottoWinningsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LottoWinningsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LottoWinningsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
