import { TestBed } from '@angular/core/testing';

import { TreasuryService } from './treasury.service';

describe('TreasuryService', () => {
  let service: TreasuryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TreasuryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
