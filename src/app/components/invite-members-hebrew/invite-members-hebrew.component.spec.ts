import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteMembersHebrewComponent } from './invite-members-hebrew.component';

describe('InviteMembersHebrewComponent', () => {
  let component: InviteMembersHebrewComponent;
  let fixture: ComponentFixture<InviteMembersHebrewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InviteMembersHebrewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteMembersHebrewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
