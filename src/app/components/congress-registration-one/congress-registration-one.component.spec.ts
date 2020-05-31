import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CongressRegistrationOneComponent } from './congress-registration-one.component';

describe('CongressRegistrationOneComponent', () => {
  let component: CongressRegistrationOneComponent;
  let fixture: ComponentFixture<CongressRegistrationOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CongressRegistrationOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CongressRegistrationOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
