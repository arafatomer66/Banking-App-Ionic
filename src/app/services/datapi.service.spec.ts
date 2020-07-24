import { TestBed } from '@angular/core/testing';

import { DatapiService } from './datapi.service';

describe('DatapiService', () => {
  let service: DatapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
