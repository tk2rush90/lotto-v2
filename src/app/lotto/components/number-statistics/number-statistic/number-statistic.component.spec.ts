import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberStatisticComponent } from './number-statistic.component';

describe('NumberStatisticComponent', () => {
  let component: NumberStatisticComponent;
  let fixture: ComponentFixture<NumberStatisticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumberStatisticComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
