import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopingCartHebrewComponent } from './shoping-cart-hebrew.component';

describe('ShopingCartHebrewComponent', () => {
  let component: ShopingCartHebrewComponent;
  let fixture: ComponentFixture<ShopingCartHebrewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopingCartHebrewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopingCartHebrewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
