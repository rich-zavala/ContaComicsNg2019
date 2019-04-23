import { TestBed } from '@angular/core/testing';

import { DbHandlingService } from './db-handling.service';

describe('DbHandlingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DbHandlingService = TestBed.get(DbHandlingService);
    expect(service).toBeTruthy();
  });
});
