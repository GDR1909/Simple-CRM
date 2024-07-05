import { TestBed } from '@angular/core/testing';

import { SimpleCrmService } from './simple-crm.service';

describe('SimpleCrmService', () => {
  let service: SimpleCrmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SimpleCrmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
