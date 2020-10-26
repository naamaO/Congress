import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipInformationHebrewComponent } from './membership-information-hebrew.component';

describe('MembershipInformationHebrewComponent', () => {
  let component: MembershipInformationHebrewComponent;
  let fixture: ComponentFixture<MembershipInformationHebrewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembershipInformationHebrewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembershipInformationHebrewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
