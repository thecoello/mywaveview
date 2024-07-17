import { Component, OnInit } from '@angular/core';
import { ListContractsComponent } from '../list-contracts/list-contracts.component';
import { AditionalPointsComponent } from '../aditional-points/aditional-points.component';
import { LowerCasePipe, NgIf, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { RegionTableComponent } from '../region-table/region-table.component';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/users';
import User from '../../models/user';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { EditUserMainComponent } from '../edit-user-main/edit-user-main.component';

@Component({
  selector: 'app-admin-contracts',
  standalone: true,
  imports: [ListContractsComponent, AditionalPointsComponent, EditUserComponent, NgIf, RegionTableComponent, TitleCasePipe, UpperCasePipe, LowerCasePipe],
  templateUrl: './admin-contracts.component.html',
  styleUrl: './admin-contracts.component.scss'
})
export class AdminContractsComponent implements OnInit {
  contracts: boolean = true
  aditionalPoints: boolean = false
  viewPoints: boolean = false
  editUser: boolean = false
  urlParam?: string
  user?: User

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!
    const localSid = localStorage.getItem('userid')

    if (id) {
      this.urlParam = id
      this.getUser(id)
    } else if (localSid) {
      this.getUser(localSid)
    } else {
      this.router.navigate(['./admin/users'])
    }
  }

  getUser(id: string) {
    this.userService.getUser(id).subscribe({
      next: (response) => {
        this.user = response
      },
      error: (error) => {
        console.log(error)
      }
    })
  }


  showContracts() {
    this.contracts = true
    this.aditionalPoints = false
    this.viewPoints = false
    this.editUser = false
  }

  showAditionalPoints() {
    this.contracts = false
    this.aditionalPoints = true
    this.viewPoints = false
    this.editUser = false
  }

  showViewPoints() {
    this.contracts = false
    this.aditionalPoints = false
    this.viewPoints = true
    this.editUser = false
  }

  showEditUser() {
    this.contracts = false
    this.aditionalPoints = false
    this.viewPoints = false
    this.editUser = true
  }

}
