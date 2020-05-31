import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CongressRegistrationOneHebrewComponent } from './congress-registration-one-hebrew.component';

describe('CongressRegistrationOneHebrewComponent', () => {
  let component: CongressRegistrationOneHebrewComponent;
  let fixture: ComponentFixture<CongressRegistrationOneHebrewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CongressRegistrationOneHebrewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CongressRegistrationOneHebrewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
