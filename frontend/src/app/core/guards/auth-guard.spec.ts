import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, UrlTree } from '@angular/router';

import { AuthGuard } from './auth-guard';
import { AuthService } from '../services/auth.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let router: Router;
  let authServiceMock: any;

  beforeEach(() => {
    authServiceMock = { isLoggedIn: jasmine.createSpy() };

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authServiceMock }
      ]
    });

    guard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow access if logged in', () => {
    authServiceMock.isLoggedIn.and.returnValue(true);

    const result = guard.canActivate({} as any, { url: '/professor' } as any);
    expect(result).toBeTrue();
  });

  it('should redirect to /auth/login if not logged in', () => {
    authServiceMock.isLoggedIn.and.returnValue(false);

    const result = guard.canActivate({} as any, { url: '/professor' } as any);
    expect(result instanceof UrlTree).toBeTrue();
  });
});

