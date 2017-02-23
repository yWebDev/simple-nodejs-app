import { HomePageComponent } from 'app/views/home-page/home-page.component';
import { LoginPageComponent } from 'app/views/login-page/login-page.component';
import { RegisterPageComponent } from 'app/views/register-page/register-page.component';
import { AuthService, LoginActivateService } from 'app/services/auth/auth.service';

export default [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [LoginActivateService]
  },
  {
    path: 'register',
    component: RegisterPageComponent,
    canActivate: [LoginActivateService]
  },
  {
    path: 'home',
    component: HomePageComponent,
    canActivate: [AuthService]
  },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full',
  }
];
