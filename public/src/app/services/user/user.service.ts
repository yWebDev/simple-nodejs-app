import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { User } from 'app/classes/user';

@Injectable()
export class UserService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private userUrl = 'api/user';
  private loginUrl = 'api/login';
  private registerUrl = 'api/register';

  constructor(private http: Http) {}

  getUsers(): Promise<any> {
    return this.http.get(this.userUrl)
      .toPromise()
      .then(response => response.json() as User[])
      .catch(this.handleError);
  }

  login(user): Promise<any> {
    return this.http.post(this.loginUrl, user)
      .toPromise()
      .then(response => response.json() as User)
      .catch(this.handleError);
  }

  register(user): Promise<any> {
    return this.http.post(this.registerUrl, user)
      .toPromise()
      .then(response => response.json() as User)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
