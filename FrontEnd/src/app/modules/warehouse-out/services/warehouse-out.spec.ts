import { TestBed } from '@angular/core/testing';

import { WarehouseOut } from './warehouse-out';

describe('WarehouseOut', () => {
  let service: WarehouseOut;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WarehouseOut);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
