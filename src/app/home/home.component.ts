import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public title;
  constructor(private _router:Router) {
  } 

  ngOnInit() {
    debugger;
    console.log("This is Home page");
    console.log("Wel-Come");
    this.title= sessionStorage.getItem("LoginUser");
   console.log(this.title);
   
  //  this.title= sessionStorage.getItem("LoginUser");
  //  console.log(this.title);
  }
 
  backClick(){
    this._router.navigateByUrl('/login');
  }

}
