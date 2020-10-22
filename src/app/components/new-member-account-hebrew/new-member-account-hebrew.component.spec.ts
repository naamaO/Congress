import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMemberAccountHebrewComponent } from './new-member-account-hebrew.component';

describe('NewMemberAccountHebrewComponent', () => {
  let component: NewMemberAccountHebrewComponent;
  let fixture: ComponentFixture<NewMemberAccountHebrewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewMemberAccountHebrewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMemberAccountHebrewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
