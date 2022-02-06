import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WinningStatisticsDetailComponent } from './winning-statistics-detail.component';

describe('WinningStatisticsDetailComponent', () => {
  let component: WinningStatisticsDetailComponent;
  let fixture: ComponentFixture<WinningStatisticsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WinningStatisticsDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WinningStatisticsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
