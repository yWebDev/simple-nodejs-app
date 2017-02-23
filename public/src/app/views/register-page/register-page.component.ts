import { Component } from '@angular/core';

import { User } from 'app/classes/user';
import { UserService } from 'app/services/user/user.service';
import { AuthService } from 'app/services/auth/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {

  constructor(private userService: UserService,
              private auth: AuthService) {}

  model = new User();

  onSubmit() {
    this.userService.register(this.model).then(res => {
      if (res && res.token) {
        this.auth.login(res.token);
      }
    }).catch(err => {
      console.error(err);
    });
  }

}
