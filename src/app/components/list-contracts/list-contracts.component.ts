import { Component, Input, OnInit } from '@angular/core';
import Contract from '../../models/contract';
import { ContractService } from '../../services/contract';
import { LowerCasePipe, NgFor, TitleCasePipe, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-list-contracts',
  standalone: true,
  imports: [NgFor, TitleCasePipe, UpperCasePipe, LowerCasePipe],
  templateUrl: './list-contracts.component.html',
  styleUrl: './list-contracts.component.scss'
})
export class ListContractsComponent implements OnInit {

  contracts?:Array<Contract>
  errorMessage?:Array<string>
  loading: boolean = false
  pagination?:Array<any>
  url:string = "http://127.0.0.1:8000/contracts"
  @Input('urlParam')urlParam?: string

  constructor(private contractService: ContractService){}

  ngOnInit(): void {
    this.getContracts(`${this.url}/${this.urlParam}`)
  }  

  getContracts(url:string){
    this.contractService.getContracts(url).subscribe({
      next: (response) =>{
        this.contracts! = response.data
        this.pagination = response.links
      },
      error: (error) => {
       console.log(error)
      }
    })
  }


}
