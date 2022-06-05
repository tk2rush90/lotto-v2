import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomOptionsComponent } from './random-options.component';

describe('RandomOptionsComponent', () => {
  let component: RandomOptionsComponent;
  let fixture: ComponentFixture<RandomOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RandomOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
