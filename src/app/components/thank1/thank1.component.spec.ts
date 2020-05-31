import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Thank1Component } from './thank1.component';

describe('Thank1Component', () => {
  let component: Thank1Component;
  let fixture: ComponentFixture<Thank1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Thank1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Thank1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
