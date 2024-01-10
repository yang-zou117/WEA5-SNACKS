import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { canNavigateToEditGuard } from './can-navigate-to-edit.guard';

describe('canNavigateToEditGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => canNavigateToEditGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
