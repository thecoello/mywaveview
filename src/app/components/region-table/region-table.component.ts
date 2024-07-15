import { Component, Input, OnInit } from '@angular/core';
import { ContractService } from '../../services/contract';
import PointsTable from '../../models/pointstable';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-region-table',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './region-table.component.html',
  styleUrl: './region-table.component.scss'
})
export class RegionTableComponent implements OnInit {

  pointsModel?: Array<PointsTable>
  @Input('urlParam') urlParam?: string

  constructor(private contractService: ContractService, private router: ActivatedRoute) {
  }

  ngOnInit(): void {

    const id = this.router.snapshot.paramMap.get('id')
    const localId = localStorage.getItem('user_id')

    if (id) {
      this.getPoints(`${environment.apiUrl}/getpoints/${id}`)
    }

    if(localId && !id){
      this.getPoints(`${environment.apiUrl}/getpoints/${localId}`)
    }

    if (this.urlParam?.includes('getallpoints')) {
      this.getPoints(`${environment.apiUrl}/${this.urlParam}`)
    }

    if (this.urlParam?.includes('region')) {
      this.getPoints(`${environment.apiUrl}/${this.urlParam}`)
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
