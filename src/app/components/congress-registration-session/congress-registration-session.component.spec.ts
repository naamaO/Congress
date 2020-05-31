import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CongressRegistrationSessionComponent } from './congress-registration-session.component';

describe('CongressRegistrationSessionComponent', () => {
  let component: CongressRegistrationSessionComponent;
  let fixture: ComponentFixture<CongressRegistrationSessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CongressRegistrationSessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CongressRegistrationSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
