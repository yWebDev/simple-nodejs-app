import { Component } from '@angular/core';

import { User } from 'app/classes/user'

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  model = new User();

  onSubmit() {
    console.log(this.model);
  }

}
