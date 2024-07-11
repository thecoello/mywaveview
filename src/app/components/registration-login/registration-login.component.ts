import { Component, OnInit } from '@angular/core';
import { RegistrationComponent } from '../registration/registration.component';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { UserService } from '../../services/users';

@Component({
  selector: 'app-registration-login',
  standalone: true,
  imports: [RegistrationComponent, LoginComponent, NgIf],
  templateUrl: './registration-login.component.html',
  styleUrl: './registration-login.component.scss'
})
export class RegistrationLoginComponent implements OnInit {

  registration: boolean = true
  login: boolean = false


  constructor(private router: Router){}


  ngOnInit(): void {

    if(localStorage.getItem('user_id') && localStorage.getItem('token')){
      this.router.navigate(['/'])
    }
    
    if(this.router.url?.includes('login')){
      this.login = true
      this.registration = false
    }

    if(this.router.url?.includes('registration')){
      this.login = false
      this.registration = true
    }
    
  }

}
