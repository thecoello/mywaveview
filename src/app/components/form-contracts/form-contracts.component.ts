import { Component } from '@angular/core';
import { ValidatorForm } from '../../packages/validatorForm';
import Contract from '../../models/contract';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-form-contracts',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './form-contracts.component.html',
  styleUrl: './form-contracts.component.scss'
})
export class FormContractsComponent {
  contractModel:Contract = new Contract()
  wasValidated:boolean = false
  validator: ValidatorForm = new ValidatorForm()


  contract(contractForm:NgForm){
    if(this.validator.validation(contractForm)){
      console.log(this.contractModel)
    }else{
      this.wasValidated = true
    }
  }

}
