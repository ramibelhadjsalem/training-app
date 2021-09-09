import { User } from './../_models/user';
import { AccountService } from './../_services/account.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model : any={}
  
  
  constructor(public acountService:AccountService,
    private router : Router,
    private toastr : ToastrService
    ){ }

  ngOnInit(): void {
   
  }
  login(){
    this.acountService.login(this.model).subscribe(response =>{
      this.router.navigateByUrl('/members')

    })
     
  }
  logout(){
    this.acountService.logout();
    this.router.navigateByUrl('/');
  
  }
  

}
