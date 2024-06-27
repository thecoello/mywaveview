import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import User from '../../models/user';
import { ValidatorForm } from '../../packages/validatorForm';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {

  registrationModel:User = new User()
  wasValidated:boolean = false
  passowrdValidated:boolean = false
  validator: ValidatorForm = new ValidatorForm()

  registration(registrationForm: NgForm){
    if(this.validator.validation(registrationForm) && this.validator.equalValidation(this.registrationModel.password!, this.registrationModel.passwordrepeat!)){
      this.passowrdValidated = false
      this.wasValidated = false
      console.log(this.registrationModel)
    }else{
      this.wasValidated = true
      this.passowrdValidated = false

      if(!this.validator.equalValidation(this.registrationModel.password!, this.registrationModel.passwordrepeat!)){
        this.passowrdValidated = true
      }
    }
    
  }

}
