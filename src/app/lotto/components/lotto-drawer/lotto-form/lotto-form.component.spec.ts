import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LottoFormComponent } from './lotto-form.component';

describe('LottoFormComponent', () => {
  let component: LottoFormComponent;
  let fixture: ComponentFixture<LottoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LottoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LottoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
