import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberStatisticsComponent } from './number-statistics.component';

describe('NumberStatisticsComponent', () => {
  let component: NumberStatisticsComponent;
  let fixture: ComponentFixture<NumberStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumberStatisticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
