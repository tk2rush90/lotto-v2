import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LottoWinningComponent } from './lotto-winning.component';

describe('LottoWinningComponent', () => {
  let component: LottoWinningComponent;
  let fixture: ComponentFixture<LottoWinningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LottoWinningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LottoWinningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
