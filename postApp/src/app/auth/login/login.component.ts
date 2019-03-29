import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "src/app/auth/auth.service";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  userForm: FormGroup;
  constructor(private _fb: FormBuilder, private _auth: AuthService) {}
  auth: any = {};
  ngOnInit() {
    //each key value pair in the form group will be form controls to  elements in the form
    this.userForm = this._fb.group({
      username: ["", [Validators.required, Validators.minLength(3)]],
      password: ["", [Validators.required, Validators.minLength(3)]]
    });
  }

  login() {
    // console.log(this._auth.checkValues(this.auth));
    console.log(this.auth);
    this._auth.checkValues(this.auth);
    //localStorage.setItem('isLogin','true');
  }
}
