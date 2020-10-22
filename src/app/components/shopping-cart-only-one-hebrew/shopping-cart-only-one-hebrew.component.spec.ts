import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCartOnlyOneHebrewComponent } from './shopping-cart-only-one-hebrew.component';

describe('ShoppingCartOnlyOneHebrewComponent', () => {
  let component: ShoppingCartOnlyOneHebrewComponent;
  let fixture: ComponentFixture<ShoppingCartOnlyOneHebrewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingCartOnlyOneHebrewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingCartOnlyOneHebrewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
