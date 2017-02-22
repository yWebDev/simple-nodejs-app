import { Component } from '@angular/core';

import { User } from 'app/classes/user';
import { UserService } from 'app/services/user/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  constructor(private userService: UserService) {}

  model = new User();

  onSubmit() {
    this.userService.login(this.model);
  }

}
