import { Component, Input, OnInit } from '@angular/core';
import Contract from '../../models/contract';
import { ContractService } from '../../services/contract';
import { LowerCasePipe, NgFor, NgIf, TitleCasePipe, UpperCasePipe } from '@angular/common';
import User from '../../models/user';
import { UserService } from '../../services/users';
import { RouterLink } from '@angular/router';

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
  loading: boolean = false
  pagination?:Array<any>
  urlContracts:string = "http://127.0.0.1:8000/contracts"
  urlUsers:string = "users"
  @Input('urlParam')urlParam?: string

  constructor(private contractService: ContractService){}

  ngOnInit(): void {
    const localSid = localStorage.getItem('user_id')
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
        }
      },
      error: (error) => {
       console.log(error)
      }
    })
  }

}
