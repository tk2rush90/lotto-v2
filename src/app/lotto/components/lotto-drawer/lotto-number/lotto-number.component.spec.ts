import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LottoNumberComponent } from './lotto-number.component';

describe('LottoNumberComponent', () => {
  let component: LottoNumberComponent;
  let fixture: ComponentFixture<LottoNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LottoNumberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LottoNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
