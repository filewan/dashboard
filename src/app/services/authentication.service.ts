import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable ,  Subject } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService} from '@auth0/angular-jwt';

import { environment } from '../../environments/environment';

@Injectable()
export class AuthenticationService {
  public token: string;
  options: RequestOptions;
  private userSource = new Subject<any>();
  private loggedInSource = new Subject<boolean>();
  loggedInSource$ = this.loggedInSource.asObservable();
  userSource$ = this.userSource.asObservable();


  constructor(
    private http: Http,
    private router: Router,
    public jwtHelper: JwtHelperService
  ) {
    // set token if saved in localstorage
    const headers: any = new Headers();
    headers.append('Content-type', 'application/json');
    this.options = new RequestOptions({
      headers: headers
    });
    this.token = localStorage.getItem('token');
  }

  login(username: string, password: string, role: string): Observable<boolean> {
    return this.http.post(environment.url + ':' + environment.services.authentication.port + '/' +
                           environment.services.authentication.resources.update.endpoint, JSON.stringify({
      username: username,
      password: password,
      role: role,
    }), this.options)

    .map((response: Response) => {
      const token = response.json() && response.json().token;
      if (token) {
        this.token = token;
        this.loggedInSource.next(true);
        localStorage.setItem('token', token);
        const decoded = this.jwtHelper.decodeToken(token);
        localStorage.setItem('currentUser', decoded._doc.username);
        localStorage.setItem('role', decoded._doc.role);
        this.userSource.next(decoded._doc.username);
        this.loggedInSource.next(true);
        this.token = token;
        return true;
      } else {
        return false;
      }
    });
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('currentUser');
    this.loggedInSource.next(false);
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return !this.jwtHelper.isTokenExpired();
  }

  isAdminLoggedIn() {
    return (!this.jwtHelper.isTokenExpired() && localStorage.getItem('role') == 'admin') ;
  }

}
