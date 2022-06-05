import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationLoadingComponent } from './application-loading.component';

describe('ApplicationLoadingComponent', () => {
  let component: ApplicationLoadingComponent;
  let fixture: ComponentFixture<ApplicationLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationLoadingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
