import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstPageHebrewComponent } from './first-page-hebrew.component';

describe('FirstPageHebrewComponent', () => {
  let component: FirstPageHebrewComponent;
  let fixture: ComponentFixture<FirstPageHebrewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstPageHebrewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstPageHebrewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
