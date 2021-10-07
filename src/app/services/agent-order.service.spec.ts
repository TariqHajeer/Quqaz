import { TestBed } from '@angular/core/testing';

import { AgentOrderService } from './agent-order.service';

describe('AgentOrderService', () => {
  let service: AgentOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgentOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
