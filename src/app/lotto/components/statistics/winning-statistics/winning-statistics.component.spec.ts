import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WinningStatisticsComponent } from './winning-statistics.component';

describe('WinningStatisticsComponent', () => {
  let component: WinningStatisticsComponent;
  let fixture: ComponentFixture<WinningStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WinningStatisticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WinningStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
