import { Component, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/users';
import User from '../../models/user';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnInit{
  
  userModel: User = new User()
  constructor(private userService: UserService, private router:Router){}

  ngOnInit(): void {
    this.userModel = new User()
    const id = localStorage.getItem('user_id')

    if(id){
      this.userService.getUser(id!).subscribe({
        next:(response)=>{
          this.userModel = response
        },
        error:(error)=>{
          this.userModel = new User()
            localStorage.clear()
            this.router.navigateByUrl('/')
        }
      })
    }
  }

  logout(){
    const logout = confirm("Confirm that you want to Sign out")

    if(logout){
      this.userService.logout().subscribe({
        next:()=>{
          localStorage.clear()
          window.location.reload()
        },
        error:()=>{
          localStorage.clear()
          this.router.navigateByUrl('/')
        }
      })     
    }
  }


}