import { TestBed } from '@angular/core/testing';

import { AphisApiService } from './aphis-api.service';

describe('AphisApiService', () => {
  let service: AphisApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AphisApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
