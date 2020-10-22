import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPassHebrewFromStoreComponent } from './user-pass-hebrew-from-store.component';

describe('UserPassHebrewFromStoreComponent', () => {
  let component: UserPassHebrewFromStoreComponent;
  let fixture: ComponentFixture<UserPassHebrewFromStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPassHebrewFromStoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPassHebrewFromStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
