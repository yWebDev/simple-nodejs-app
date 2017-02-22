import { Injectable } from '@angular/core';

import { User } from '@app/classes/user'

@Injectable()
export class UserService {

  getUserInfo(): Promise<User> {
    return Promise.resolve({});
  }

}
