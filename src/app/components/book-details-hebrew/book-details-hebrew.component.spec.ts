import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDetailsHebrewComponent } from './book-details-hebrew.component';

describe('BookDetailsHebrewComponent', () => {
  let component: BookDetailsHebrewComponent;
  let fixture: ComponentFixture<BookDetailsHebrewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookDetailsHebrewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDetailsHebrewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
