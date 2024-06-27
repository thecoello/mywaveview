import { Component, OnInit } from '@angular/core';
import Login from '../../models/login';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, } from '@angular/forms';
import { ValidatorForm } from '../../packages/validatorForm';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginModel:Login = new Login()
  wasValidated:boolean = false
  validator: ValidatorForm = new ValidatorForm()

  login(loginForm: NgForm){
    if(this.validator.validation(loginForm)){
      console.log(this.loginModel)
    }else{
      this.wasValidated = true
    }
  }

}
