import { Component, OnInit } from '@angular/core';
import { ListContractsComponent } from '../list-contracts/list-contracts.component';
import { AditionalPointsComponent } from '../aditional-points/aditional-points.component';
import { NgIf } from '@angular/common';
import { RegionTableComponent } from '../region-table/region-table.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-contracts',
  standalone: true,
  imports: [ListContractsComponent, AditionalPointsComponent, NgIf, RegionTableComponent],
  templateUrl: './admin-contracts.component.html',
  styleUrl: './admin-contracts.component.scss'
})
export class AdminContractsComponent implements OnInit {
  contracts:boolean = true
  aditionalPoints:boolean = false
  viewPoints:boolean = false
  urlParam?: string

  constructor(private route: ActivatedRoute, private router: Router){}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!

    if(id){
      this.urlParam = id
    }else{
      this.router.navigate(['./admin/users'])
    }
  }

  showContracts(){
    this.contracts = true
    this.aditionalPoints = false
    this.viewPoints = false
  }

  showAditionalPoints(){
    this.contracts = false
    this.aditionalPoints = true
    this.viewPoints = false
  }

  showViewPoints(){
    this.contracts = false
    this.aditionalPoints = false
    this.viewPoints = true
  }

}
