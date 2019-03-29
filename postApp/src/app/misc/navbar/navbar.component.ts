import { Component, OnInit } from '@angular/core';
import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private _auth:AuthService) { }
  userStatus:any=false;
  ngOnInit() {
    console.log("entered init");
    this._auth.$auth.subscribe((data: any) => {
      console.log("entered subscribe"+data);
      this.userStatus = data;
    });
  }
  logout(){
    this._auth.logout();
  }
}
