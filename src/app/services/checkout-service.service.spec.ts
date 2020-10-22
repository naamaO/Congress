import { TestBed } from '@angular/core/testing';

import { CheckoutServiceService } from './checkout-service.service';

describe('CheckoutServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CheckoutServiceService = TestBed.get(CheckoutServiceService);
    expect(service).toBeTruthy();
  });
});
