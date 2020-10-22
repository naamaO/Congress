import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMemberAccountHebrewFromStoreComponent } from './new-member-account-hebrew-from-store.component';

describe('NewMemberAccountHebrewFromStoreComponent', () => {
  let component: NewMemberAccountHebrewFromStoreComponent;
  let fixture: ComponentFixture<NewMemberAccountHebrewFromStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewMemberAccountHebrewFromStoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMemberAccountHebrewFromStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
