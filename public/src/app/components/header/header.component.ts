import { Component } from '@angular/core';

import { AuthService } from 'app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private auth: AuthService) { }

  showLogout(): boolean {
    return this.auth.isAuthorized();
  }

  logout(): void {
    this.auth.logout();
  }
}
