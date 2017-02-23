import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

const tokenKey = 'sa-utoken';

@Injectable()
export class AuthService implements CanActivate {
  private tokenKey: string = tokenKey;

  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem(this.tokenKey)) {
      return true;
    }
    this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
    return false;
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string {
    return localStorage.getItem(this.tokenKey);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isAuthorized(): boolean {
    return !!(this.getToken())
  }

  login(token: string): void {
    this.setToken(token);
    this.router.navigate(['/home']);
  }

  logout(): void {
    this.removeToken();
    this.router.navigate(['/login']);
  }
}

@Injectable()
export class LoginActivateService implements CanActivate {
  private tokenKey: string = tokenKey;

  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!localStorage.getItem(this.tokenKey)) {
      return true;
    }
    this.router.navigate(['/home']);
    return false;
  }
}
