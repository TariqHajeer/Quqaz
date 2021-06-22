import { TestBed } from '@angular/core/testing';

import { CsettingService } from './csetting.service';

describe('CsettingService', () => {
  let service: CsettingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CsettingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
