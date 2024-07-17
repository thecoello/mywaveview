import { Component, OnInit } from '@angular/core';
import Login from '../../models/login';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, } from '@angular/forms';
import { ValidatorForm } from '../../packages/validatorForm';
import { UserService } from '../../services/users';
import { NgFor, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginModel:Login = new Login()
  wasValidated:boolean = false
  validator: ValidatorForm = new ValidatorForm()
  errorMessage?:Array<string>
  loading: boolean = false

  constructor(private userService: UserService, private router: Router){}

  login(loginForm: NgForm){
    this.loading = true;
    this.errorMessage = []

    if(this.validator.validation(loginForm)){
      this.userService.login(this.loginModel).subscribe({
        next: (response) =>{
          localStorage.setItem('token',response.token)
          localStorage.setItem('userid',response.user_id)

          if(localStorage.getItem('token') && localStorage.getItem('userid')){
            window.location.reload()
          }
          
        },
        error: (error) => {
          this.errorMessage!.push(error.error)
          this.loginModel.password = ""
          this.loading = false;
        }
      })
    }else{
      this.wasValidated = true
    }
  }

}
