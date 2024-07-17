import { Component, Input, OnInit } from '@angular/core';
import Contract from '../../models/contract';
import { ContractService } from '../../services/contract';
import { LowerCasePipe, NgFor, NgIf, TitleCasePipe, UpperCasePipe } from '@angular/common';
import User from '../../models/user';
import { UserService } from '../../services/users';
import { RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-list-contracts',
  standalone: true,
  imports: [NgFor, NgIf, TitleCasePipe, UpperCasePipe, LowerCasePipe, RouterLink],
  templateUrl: './list-contracts.component.html',
  styleUrl: './list-contracts.component.scss'
})
export class ListContractsComponent implements OnInit {
  contracts?:Array<Contract>
  errorMessage?:Array<string>
  loading: boolean = true
  pagination?:Array<any>
  urlContracts:string = environment.apiUrl + "/contracts"
  urlUsers:string = "users"
  @Input('urlParam')urlParam?: string
  enviromentApiUrl:string = environment.publicUrl

  constructor(private contractService: ContractService){}

  ngOnInit(): void {
    const localSid = localStorage.getItem('userid')
    if (this.urlParam) {
      this.getContracts(this.urlParam)
    } else if (localSid) {
      this.getContracts(localSid)
    }
  }

  removeContract(id: string){
    const btnConfirm = confirm("Confirm that you want to remove this contract")
    if(btnConfirm){
      this.loading = true;
      this.contractService.deleteContract(id).subscribe({
        next: (response) =>{
          setTimeout(() => {
            window.location.reload()
            this.loading = false;
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
    }
  }

  getContracts(url:string){
    this.contractService.getContracts(url).subscribe({
      next: (response) =>{
        if(response){
          this.contracts! = response.data
          this.pagination = response.links
          this.loading = false
        }
      },
      error: (error) => {
       console.log(error)
      }
    })
  }

}
