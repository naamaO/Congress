import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCartOnlyOneComponent } from './shopping-cart-only-one.component';

describe('ShoppingCartOnlyOneComponent', () => {
  let component: ShoppingCartOnlyOneComponent;
  let fixture: ComponentFixture<ShoppingCartOnlyOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingCartOnlyOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingCartOnlyOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
