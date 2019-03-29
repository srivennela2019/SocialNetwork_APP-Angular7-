import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject, BehaviorSubject } from "rxjs"; // to save and send current data
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private _router: Router, private _http: HttpClient) {}
  $auth = new BehaviorSubject(this.checkLogin()); // to avoid refreshes
  //islogin: any;
  checkLogin() {
    if (localStorage.token) {
      return localStorage.getItem("token");
    } else {
      return "";
    }
  }
  checkValues(token) {
    this._http
      .post("http://localhost:3000/api/social/authenticate", token)
      .subscribe((data: any) => {
        console.log("login" + data.token);
        if (data.islogin) {
          localStorage.setItem("token", data.token);
          this.$auth.next(this.checkLogin());
          this._router.navigate(["/posts"]);
        } else {
          alert("please enter valid details");
          return false;
        }
      });
    // if (token.username == "admin" && token.password == "admin") {
    //   localStorage.setItem("islogin", "true");
    //   this.$auth.next(this.checkLogin());
    //   this._router.navigate(["/products"]);
    // } else {
    //   alert("please enter valid details");
    //   return false;
    // }
  }
  logout() {
    localStorage.removeItem("token");
    this.$auth.next(this.checkLogin());
    this._router.navigate(["/login"]);
  }
}
