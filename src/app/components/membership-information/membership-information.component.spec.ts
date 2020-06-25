import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipInformationComponent } from './membership-information.component';

describe('MembershipInformationComponent', () => {
  let component: MembershipInformationComponent;
  let fixture: ComponentFixture<MembershipInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembershipInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembershipInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
