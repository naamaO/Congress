import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CongressRegistrationSecondHebrewComponent } from './congress-registration-second-hebrew.component';

describe('CongressRegistrationSecondHebrewComponent', () => {
  let component: CongressRegistrationSecondHebrewComponent;
  let fixture: ComponentFixture<CongressRegistrationSecondHebrewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CongressRegistrationSecondHebrewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CongressRegistrationSecondHebrewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
