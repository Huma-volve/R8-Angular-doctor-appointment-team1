import { TestBed } from '@angular/core/testing';

import { Auth1 } from './auth1';

describe('Auth1', () => {
  let service: Auth1;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Auth1);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
