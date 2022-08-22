import { TestBed } from '@angular/core/testing';

import { ConvertToExcelService } from './convert-to-excel.service';

describe('ConvertToExcelService', () => {
  let service: ConvertToExcelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConvertToExcelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
