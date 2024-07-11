import { Component, OnInit } from '@angular/core';
import Login from '../../models/login';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, } from '@angular/forms';
import { ValidatorForm } from '../../packages/validatorForm';
import { UserService } from '../../services/users';
import { NgFor, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgotp',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor,RouterLink],
  templateUrl: './forgotp.component.html',
  styleUrl: './forgotp.component.scss'
})
export class ForgotpComponent {
  email?:string
  wasValidated:boolean = false
  validator: ValidatorForm = new ValidatorForm()
  errorMessage?:Array<string>
  loading: boolean = false

  constructor(private userService: UserService, private router: Router){}

 login(loginForm: NgForm){
    this.loading = true;
    this.errorMessage = []

    if(this.validator.validation(loginForm)){
      this.userService.passwordRecover(this.email!).subscribe({
        next: (response) =>{

        },
        error: (error) => {
          this.errorMessage!.push(error.error)
          this.email = ""
          this.loading = false;
        }
      })
    }else{
      this.wasValidated = true
    }
  }
}
