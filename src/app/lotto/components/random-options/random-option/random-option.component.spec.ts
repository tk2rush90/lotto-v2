import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomOptionComponent } from './random-option.component';

describe('RandomOptionComponent', () => {
  let component: RandomOptionComponent;
  let fixture: ComponentFixture<RandomOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RandomOptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
