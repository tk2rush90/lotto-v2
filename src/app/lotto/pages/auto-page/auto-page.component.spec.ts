import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoPageComponent } from './auto-page.component';

describe('AutoPageComponent', () => {
  let component: AutoPageComponent;
  let fixture: ComponentFixture<AutoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
