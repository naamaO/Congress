import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPassHebrewComponent } from './user-pass-hebrew.component';

describe('UserPassHebrewComponent', () => {
  let component: UserPassHebrewComponent;
  let fixture: ComponentFixture<UserPassHebrewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPassHebrewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPassHebrewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
