import { TestBed } from '@angular/core/testing';

import { COrderService } from './c-order.service';

describe('COrderService', () => {
  let service: COrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(COrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
