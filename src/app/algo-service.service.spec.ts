import { TestBed } from '@angular/core/testing';

import { AlgoService } from './algo-service.service';

describe('AlgoServiceService', () => {
  let service: AlgoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlgoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
