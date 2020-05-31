import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationOneHebrewComponent } from './registration-one-hebrew.component';

describe('RegistrationOneHebrewComponent', () => {
  let component: RegistrationOneHebrewComponent;
  let fixture: ComponentFixture<RegistrationOneHebrewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationOneHebrewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationOneHebrewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
