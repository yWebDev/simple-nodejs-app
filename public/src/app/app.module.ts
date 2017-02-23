import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule }   from '@angular/router';

import { AppComponent } from 'app/app.component';
import { LoginPageComponent } from 'app/views/login-page/login-page.component';
import { HeaderComponent } from 'app/components/header/header.component';
import { FooterComponent } from 'app/components/footer/footer.component';
import { UserService } from 'app/services/user/user.service';
import { HomePageComponent } from 'app/views/home-page/home-page.component';
import Routes from 'app/routes/routes.module';
import { RegisterPageComponent } from 'app/views/register-page/register-page.component';
import { AuthService, LoginActivateService } from 'app/services/auth/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HeaderComponent,
    FooterComponent,
    HomePageComponent,
    RegisterPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(Routes)
  ],
  providers: [
    UserService,
    AuthService,
    LoginActivateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
