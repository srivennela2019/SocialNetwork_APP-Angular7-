import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from "src/app/misc/registration/registration.component";
import { LoginComponent } from "src/app/auth/login/login.component";
import { PostsComponent } from "src/app/posts/posts/posts.component";
import { AuthGuard } from "./auth/auth.guard";
import { DetailsComponent } from "src/app/posts/details/details.component";
const routes: Routes = [
  { path: "registration", component: RegistrationComponent },
  { path: "login", component: LoginComponent },
  { path: "posts", component: PostsComponent, canActivate: [AuthGuard] },
  { path: "posts/details/:pid", component: DetailsComponent, canActivate: [AuthGuard] },
  { path: "", redirectTo: "login", pathMatch: "full" }, // path match matches the exact path given
  { path: "**", redirectTo: "login" } //** 

  //** is wild card to handle wrong paths
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
