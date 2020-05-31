import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CongressRegistrationSessionHebrewComponent } from './congress-registration-session-hebrew.component';

describe('CongressRegistrationSessionHebrewComponent', () => {
  let component: CongressRegistrationSessionHebrewComponent;
  let fixture: ComponentFixture<CongressRegistrationSessionHebrewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CongressRegistrationSessionHebrewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CongressRegistrationSessionHebrewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
