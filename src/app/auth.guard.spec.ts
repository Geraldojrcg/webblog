import { TestBed, async, inject } from '@angular/core/testing';

import { AuthGuardGuard } from './auth.guard';

describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardGuard]
    });
  });

  it('should ...', inject([AuthGuardGuard], (guard: AuthGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
