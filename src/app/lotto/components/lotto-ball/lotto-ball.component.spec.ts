import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LottoBallComponent } from './lotto-ball.component';

describe('LottoBallComponent', () => {
  let component: LottoBallComponent;
  let fixture: ComponentFixture<LottoBallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LottoBallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LottoBallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
