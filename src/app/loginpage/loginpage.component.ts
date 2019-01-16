import { Component, OnInit } from '@angular/core';
// import {LoginServiceService} from '../login-service.service';
import {Router} from '@angular/router'
import {HttpClient} from '@angular/common/http'
declare const gapi: any;

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.scss'],
  providers:[]
})
export class LoginpageComponent implements OnInit {

  public uName;
  public uPassword;
  public loginName;
  public validate:boolean=false;
  constructor(private _router:Router,private http:HttpClient) { }

  ngOnInit() {
  }

  public auth2: any;
  public googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '1072725443553-0ddoadqco4nra152o669ro33m77rmvdl.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      var a=this.attachSignin(document.getElementById('googleBtn'));
      // alert(a);
      

    });
  }
  loginClick(){
    sessionStorage.setItem("LoginUser", "Richards");
    this._router.navigate(['/Home']);

  }
  public attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {

        let profile = googleUser.getBasicProfile();
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        //YOUR CODE HERE
        sessionStorage.setItem("LoginUser", profile.getName());

        this.http.get("https://www.googleapis.com/oauth2/v3/tokeninfo?id_token="+googleUser.getAuthResponse().id_token)
          .subscribe(onSuccess => {
            console.log(onSuccess);
           //login was successful
           this.validate= true;
           if(this.validate==true){
            this._router.navigate(['/Home']);
          }
           //save the token that you got from your REST API in your preferred location i.e. as a Cookie or LocalStorage as you do with normal login
         }, onFail => {
            //login was unsuccessful
            //show an error message
         }
       );

      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }
  public attachSignout(){
    var signOut=gapi.auth2.getAuthInstance();
    signOut.signOut().then(function () {
      // console.log(res);
      console.log('User signed out.');
      signOut.disconnect();
      alert("User Sign out")
    });
  }

  signOutGoogle(){
    this.attachSignout();
  }
ngAfterViewInit(){
      this.googleInit();
}

}
