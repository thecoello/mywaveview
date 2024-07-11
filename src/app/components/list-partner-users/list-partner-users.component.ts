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
  user?:User
  errorMessage?:Array<string>
  loading: boolean = false
  pagination?:Array<any>
  url:string = "http://127.0.0.1:8000/api/users"

  constructor(private userService: UserService, private router:Router){}

  ngOnInit(): void {
    const id = localStorage.getItem('user_id')
    console.log(id)
    if(id){
      this.getUser(id!)
    }else{
      this.router.navigate(['/'])
    }
  }  

  getUser(id: string){
    this.userService.getUser(id).subscribe({
      next: (response)=>{
        this.user = response
        if(this.user.usertype == "ADMIN"){
          this.getUsers(this.url)
        }else{
          this.router.navigate(['/'])
        }
      }
    })
  }

  getUsers(url:string){
    this.userService.getUsers(url).subscribe({
      next: (response) =>{
        this.users! = response.data
        this.pagination = response.links
      },
      error: (error) => {
        if(error.status == 403){
          this.router.navigate(['/'])
        }
        this.loading = false;
      }
    })
  }


}
