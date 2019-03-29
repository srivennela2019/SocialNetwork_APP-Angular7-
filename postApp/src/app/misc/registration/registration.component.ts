import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.css"]
})
export class RegistrationComponent implements OnInit {
  userForm: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private _http: HttpClient,
    private _router: Router
  ) {}
  user: any = {};
  ob: any;
  ngOnInit() {
    //each key value pair in the form group will be form controls to  elements in the form
    this.userForm = this._fb.group({
      username: ["", [Validators.required, Validators.minLength(3)]],
      password: ["", [Validators.required, Validators.minLength(8)]],
      firstname: ["", [Validators.required, Validators.minLength(5)]], //initial value and validators
      lastname: ["", [Validators.required, Validators.minLength(5)]],
      gender: ["", Validators.required]
    });
  }
  // updateValidity(value) {
  //   const lastnameCtrl = this.userForm.get("lastname");
  //   if (value == "male") {
  //     lastnameCtrl.setValidators(Validators.required); // or we can pass an array [Validators.required,Validators.minLength(5)]
  //   } else {
  //     lastnameCtrl.clearValidators();
  //   }
  //   lastnameCtrl.updateValueAndValidity(); // for checking for the updated value
  // }
  addNewUser() {
    this.ob = this._http.post("http://localhost:3000/api/social", this.user);
    this.ob.subscribe(data => {
      console.log(data);
      this._router.navigate(["/login"]);
    });
    
  }
}
