import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPassFromStoreComponent } from './user-pass-from-store.component';

describe('UserPassFromStoreComponent', () => {
  let component: UserPassFromStoreComponent;
  let fixture: ComponentFixture<UserPassFromStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPassFromStoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPassFromStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
