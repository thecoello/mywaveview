import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import User from '../../models/user';
import { ValidatorForm } from '../../packages/validatorForm';
import { NgFor, NgIf, TitleCasePipe, UpperCasePipe } from '@angular/common';
import Country from '../../packages/country';
import { UserService } from '../../services/users';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor, TitleCasePipe, UpperCasePipe],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {
  countries = new Country().countries
  registrationModel:User = new User()
  wasValidated:boolean = false
  passwordValidated:boolean = false
  errorMessage?:Array<string>
  validator: ValidatorForm = new ValidatorForm()
  registered: boolean = false

  loading: boolean = false

  constructor(private userService: UserService){}

  private submit(user: User){

    this.loading = true;
    this.errorMessage = []

    setTimeout(() => {
      this.userService.createUser(user).subscribe({
        next: (response) =>{
          this.registered = true
          setTimeout(() => {
            window.location.href = './login'
          }, 1500);
        },
        error: (error) => {
          for (const key in error.error) {
            error.error[key].forEach((message:string) => {
              this.errorMessage!.push(message)
            });
          }
          this.loading = false;
        }
      })
    }, 500);
  }

  registration(registrationForm: NgForm){
    if(this.validator.validation(registrationForm) && this.validator.equalValidation(this.registrationModel.password!, this.registrationModel.passwordrepeat!)){
      this.passwordValidated = false
      this.wasValidated = false
  
        this.submit(this.registrationModel)

    }else{
      this.wasValidated = true
      this.passwordValidated = false
      if(!this.validator.equalValidation(this.registrationModel.password!, this.registrationModel.passwordrepeat!)){
        this.passwordValidated = true
      }
    }
  }

}
