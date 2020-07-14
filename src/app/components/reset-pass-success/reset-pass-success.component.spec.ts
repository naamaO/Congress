import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPassSuccessComponent } from './reset-pass-success.component';

describe('ResetPassSuccessComponent', () => {
  let component: ResetPassSuccessComponent;
  let fixture: ComponentFixture<ResetPassSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetPassSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPassSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
