import { Component, Input, OnInit } from '@angular/core';
import { ContractService } from '../../services/contract';
import PointsTable from '../../models/pointstable';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';

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

  constructor(private contractService: ContractService, private route:Router) {
   }

  ngOnInit(): void {
    this.getPoints(`http://127.0.0.1:8000/${this.urlParam}`)
  }

  getPoints(url: string) {
    this.contractService.getPoints(url).subscribe({
      next: (response) => {
        this.pointsModel = response
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

}
