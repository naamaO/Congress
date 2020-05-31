import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Thank2Component } from './thank2.component';

describe('Thank2Component', () => {
  let component: Thank2Component;
  let fixture: ComponentFixture<Thank2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Thank2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Thank2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
