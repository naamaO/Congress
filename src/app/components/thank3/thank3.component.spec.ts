import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Thank3Component } from './thank3.component';

describe('Thank3Component', () => {
  let component: Thank3Component;
  let fixture: ComponentFixture<Thank3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Thank3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Thank3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
