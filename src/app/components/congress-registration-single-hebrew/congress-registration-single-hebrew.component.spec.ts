import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CongressRegistrationSingleHebrewComponent } from './congress-registration-single-hebrew.component';

describe('CongressRegistrationSingleHebrewComponent', () => {
  let component: CongressRegistrationSingleHebrewComponent;
  let fixture: ComponentFixture<CongressRegistrationSingleHebrewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CongressRegistrationSingleHebrewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CongressRegistrationSingleHebrewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
