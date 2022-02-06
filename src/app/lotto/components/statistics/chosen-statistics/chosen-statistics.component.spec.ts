import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChosenStatisticsComponent } from './chosen-statistics.component';

describe('ChosenStatisticsComponent', () => {
  let component: ChosenStatisticsComponent;
  let fixture: ComponentFixture<ChosenStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChosenStatisticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChosenStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
