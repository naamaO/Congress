import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CongressRegistrationSingleComponent } from './congress-registration-single.component';

describe('CongressRegistrationSingleComponent', () => {
  let component: CongressRegistrationSingleComponent;
  let fixture: ComponentFixture<CongressRegistrationSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CongressRegistrationSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CongressRegistrationSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
