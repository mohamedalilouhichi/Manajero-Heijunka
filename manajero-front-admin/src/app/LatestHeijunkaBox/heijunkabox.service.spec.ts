import { TestBed } from '@angular/core/testing';

import { HeijunkaboxService } from './heijunkabox.service';

describe('HeijunkaboxService', () => {
  let service: HeijunkaboxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeijunkaboxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
