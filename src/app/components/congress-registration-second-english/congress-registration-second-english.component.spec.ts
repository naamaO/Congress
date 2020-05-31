import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CongressRegistrationSecondEnglishComponent } from './congress-registration-second-english.component';

describe('CongressRegistrationSecondEnglishComponent', () => {
  let component: CongressRegistrationSecondEnglishComponent;
  let fixture: ComponentFixture<CongressRegistrationSecondEnglishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CongressRegistrationSecondEnglishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CongressRegistrationSecondEnglishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
