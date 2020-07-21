import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { successComponent } from './success.component';

describe('successComponent', () => {
  let component: successComponent;
  let fixture: ComponentFixture<successComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ successComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(successComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
