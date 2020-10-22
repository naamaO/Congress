import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserPassSuccessHebrewComponent } from './reser-pass-success-hebrew.component';

describe('ReserPassSuccessHebrewComponent', () => {
  let component: ReserPassSuccessHebrewComponent;
  let fixture: ComponentFixture<ReserPassSuccessHebrewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReserPassSuccessHebrewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReserPassSuccessHebrewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
