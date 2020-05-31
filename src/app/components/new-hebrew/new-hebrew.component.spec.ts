import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewHebrewComponent } from './new-hebrew.component';

describe('NewHebrewComponent', () => {
  let component: NewHebrewComponent;
  let fixture: ComponentFixture<NewHebrewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewHebrewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewHebrewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
