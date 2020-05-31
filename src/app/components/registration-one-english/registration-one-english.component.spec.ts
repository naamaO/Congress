import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationOneEnglishComponent } from './registration-one-english.component';

describe('RegistrationOneEnglishComponent', () => {
  let component: RegistrationOneEnglishComponent;
  let fixture: ComponentFixture<RegistrationOneEnglishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationOneEnglishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationOneEnglishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
