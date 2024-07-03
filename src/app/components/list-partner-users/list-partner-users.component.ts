import { Component, OnInit } from '@angular/core';
import User from '../../models/user';
import { UserService } from '../../services/users';
import { LowerCasePipe, NgFor, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { toArray } from 'rxjs';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-partner-users',
  standalone: true,
  imports: [NgFor, TitleCasePipe, UpperCasePipe, LowerCasePipe, RouterLink],
  templateUrl: './list-partner-users.component.html',
  styleUrl: './list-partner-users.component.scss'
})
export class ListPartnerUsersComponent implements OnInit {

  users?:Array<User>
  errorMessage?:Array<string>
  loading: boolean = false
  pagination?:Array<any>
  url:string = "http://127.0.0.1:8000/users"

  constructor(private userService: UserService){}

  ngOnInit(): void {
    this.getUsers(this.url)
  }  

  getUsers(url:string){
    this.userService.getUsers(url).subscribe({
      next: (response) =>{
        this.users! = response.data
        this.pagination = response.links
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
