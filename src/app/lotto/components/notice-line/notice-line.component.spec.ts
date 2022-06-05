import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeLineComponent } from './notice-line.component';

describe('NoticeLineComponent', () => {
  let component: NoticeLineComponent;
  let fixture: ComponentFixture<NoticeLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoticeLineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticeLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
