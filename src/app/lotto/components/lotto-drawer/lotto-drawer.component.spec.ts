import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LottoDrawerComponent } from './lotto-drawer.component';

describe('LottoDrawerComponent', () => {
  let component: LottoDrawerComponent;
  let fixture: ComponentFixture<LottoDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LottoDrawerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LottoDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
