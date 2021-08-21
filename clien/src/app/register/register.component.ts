import { ToastrService } from 'ngx-toastr';
import { AccountService } from './../_services/account.service';
import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model : any={} ; 

  @Output() cancelRegister = new EventEmitter()
  constructor(
    private accountServices  :AccountService,
    private toastr  : ToastrService
    ) { }

  ngOnInit(): void {
  }
  register(){
    console.log(this.model);
    this.accountServices.register(this.model)
      .subscribe(response =>{
        console.log(response) ;
        this.cancel() ; 
         },error =>{
           console.log({error})
           this.toastr.error(error.error)  ;}
      )

  }
  cancel(){
    this.cancelRegister.emit(false) ;
  }
}
