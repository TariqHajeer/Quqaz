import { TestBed } from '@angular/core/testing';

import { OrderPlacedStateService } from './order-placed-state.service';

describe('OrderPlacedStateService', () => {
  let service: OrderPlacedStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderPlacedStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
