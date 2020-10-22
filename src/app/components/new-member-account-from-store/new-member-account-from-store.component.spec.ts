import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMemberAccountFromStoreComponent } from './new-member-account-from-store.component';

describe('NewMemberAccountFromStoreComponent', () => {
  let component: NewMemberAccountFromStoreComponent;
  let fixture: ComponentFixture<NewMemberAccountFromStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewMemberAccountFromStoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMemberAccountFromStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
