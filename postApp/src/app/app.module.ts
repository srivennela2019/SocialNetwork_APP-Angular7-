import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts/posts.component';
import { DetailsComponent } from './posts/details/details.component';
import { LoginComponent } from './auth/login/login.component';
import { NavbarComponent } from './misc/navbar/navbar.component';
import { PostBoxComponent } from './misc/post-box/post-box.component';
import { RegistrationComponent } from './misc/registration/registration.component';
import { PanelComponent } from './misc/panel/panel.component';
import { AuthService } from "src/app/auth/auth.service";

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    DetailsComponent,
    LoginComponent,
    NavbarComponent,
    PostBoxComponent,
    RegistrationComponent,
    PanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
