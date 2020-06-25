import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMemberAccountCompponent } from './new-member-account.component';

describe('CongressRegistrationOneComponent', () => {
  let component: NewMemberAccountCompponent;
  let fixture: ComponentFixture<NewMemberAccountCompponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewMemberAccountCompponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMemberAccountCompponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
