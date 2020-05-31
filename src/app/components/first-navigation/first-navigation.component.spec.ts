import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstNavigationComponent } from './first-navigation.component';

describe('FirstNavigationComponent', () => {
  let component: FirstNavigationComponent;
  let fixture: ComponentFixture<FirstNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
