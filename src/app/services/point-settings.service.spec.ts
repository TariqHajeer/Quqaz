import { TestBed } from '@angular/core/testing';

import { PointSettingsService } from './point-settings.service';

describe('PointSettingsService', () => {
  let service: PointSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PointSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
