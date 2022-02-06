import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WinningDetailItemComponent } from './winning-detail-item.component';

describe('WinningDetailItemComponent', () => {
  let component: WinningDetailItemComponent;
  let fixture: ComponentFixture<WinningDetailItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WinningDetailItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WinningDetailItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
