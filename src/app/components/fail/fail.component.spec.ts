import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { failComponent } from './fail.component';

describe('failComponent', () => {
  let component: failComponent;
  let fixture: ComponentFixture<failComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ failComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(failComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
