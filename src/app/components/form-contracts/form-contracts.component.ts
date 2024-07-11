import { Component, OnInit } from '@angular/core';
import { ValidatorForm } from '../../packages/validatorForm';
import Contract from '../../models/contract';
import { FormsModule, NgForm } from '@angular/forms';
import { ContractService } from '../../services/contract';
import Country from '../../packages/country';
import { NgFor, NgIf, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-contracts',
  standalone: true,
  imports: [FormsModule, UpperCasePipe, TitleCasePipe, NgFor, NgIf],
  templateUrl: './form-contracts.component.html',
  styleUrl: './form-contracts.component.scss'
})
export class FormContractsComponent implements OnInit {
  countries = new Country().countries
  contractModel: Contract = new Contract()
  wasValidated: boolean = false
  validator: ValidatorForm = new ValidatorForm()
  loading: boolean = false
  errorMessage?:Array<string>
  contractCreated: boolean = false
  contractFD: FormData = new FormData()

  constructor(private contractservice: ContractService, private router: Router) { }

  ngOnInit(): void {
    this.contractModel.user_id = parseInt(localStorage.getItem('user_id')!)
  }

  private submit(contract: FormData) {

    this.loading = true;
    this.errorMessage = []

    setTimeout(() => {
      this.contractservice.createContract(contract).subscribe({
        next: (response) => {
          this.contractCreated = true
          setTimeout(() => {
            this.router.navigate(['./points'])
          }, 1500);
        },
        error: (error) => {
          for (const key in error.error) {
            error.error[key].forEach((message: string) => {
              this.errorMessage!.push(message)
            });
          }
          this.loading = false;
        }
      })
    }, 500);
  }

  getContract(event: any){
    this.errorMessage = []
    const file = event.target.files[0]

    if(this.validator.fileType(file) && this.validator.fileSize(file, 2)){
      this.contractFD.append('file',event.target.files[0])
    }

    if(!this.validator.fileType(file)){
      this.errorMessage!.push('The file must be a pdf or jpg, jpeg image.')
      event.target.value = ''
    }
    
    if(!this.validator.fileSize(file, 2)){
      this.errorMessage!.push('The maximum file size allowed is 2mb.')
      event.target.value = ''
    }
    
  }

  contract(contractForm: NgForm) {

    if (this.validator.validation(contractForm)) {

      this.contractFD.append('customername',this.contractModel.customername!)
      this.contractFD.append('saletype',this.contractModel.saletype!)
      this.contractFD.append('country',this.contractModel.country!)
      this.contractFD.append('points','')
      this.contractFD.append('user_id',this.contractModel.user_id!.toString())

      this.submit(this.contractFD)

    } else {
      this.wasValidated = true
    }
  }

}