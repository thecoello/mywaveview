import { Component, Input, OnInit } from '@angular/core';
import { ContractService } from '../../services/contract';
import PointsTable from '../../models/pointstable';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-region-table',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './region-table.component.html',
  styleUrl: './region-table.component.scss'
})
export class RegionTableComponent implements OnInit{

  pointsModel?:Array<PointsTable>
  @Input('urlParam')urlParam?: string

  constructor(private contractService: ContractService) {
   }

  ngOnInit(): void {
    const localSid = localStorage.getItem('user_id')
    if(this.urlParam?.includes('getallpointsregion')){
      this.getPoints(`http://127.0.0.1:8000/api/${this.urlParam}`)
    }else{
      if (this.urlParam) {
        this.getPoints(`http://127.0.0.1:8000/api/getpoints/${this.urlParam}`)
      }else if (localSid) {
        this.getPoints(`http://127.0.0.1:8000/api/getpoints/${localSid}`)
      } 
    }
  }

  getPoints(url: string) {
    this.contractService.getPoints(url).subscribe({
      next: (response) => {
        this.pointsModel = response
      }
    })
  }

}
