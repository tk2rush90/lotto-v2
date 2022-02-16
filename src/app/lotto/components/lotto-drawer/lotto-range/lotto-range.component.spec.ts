import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LottoRangeComponent } from './lotto-range.component';

describe('LottoRangeComponent', () => {
  let component: LottoRangeComponent;
  let fixture: ComponentFixture<LottoRangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LottoRangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LottoRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
