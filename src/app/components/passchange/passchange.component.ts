import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import User from '../../models/user';
import { ValidatorForm } from '../../packages/validatorForm';
import { NgFor, NgIf, TitleCasePipe, UpperCasePipe } from '@angular/common';
import Country from '../../packages/country';
import { UserService } from '../../services/users';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-passchange',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor, TitleCasePipe, UpperCasePipe, RouterLink],
  templateUrl: './passchange.component.html',
  styleUrl: './passchange.component.scss'
})
export class PasschangeComponent implements OnInit {
  token?:string
  showForm:boolean = false
  wasValidated:boolean = false
  passwordValidated:boolean = false
  errorMessage?:Array<string>
  validator: ValidatorForm = new ValidatorForm()
  passwordchanged: boolean = false
  loading: boolean = false
  password?:string
  passwordrepeat?:string

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router){}

  ngOnInit(): void {

    const tokenParam = this.route.snapshot.paramMap.get('token')!


   if(tokenParam != null){
      this.userService.consultToken(tokenParam).subscribe({
        next:(response)=>{
          if(response){
            this.showForm = true
            this.token = response.token!
          }else{
            this.router.navigate(['./login'])
          }
        },
        error:(error)=>{
          this.router.navigate(['./login'])
        } 
      })
    } 
  }

  private submit(body: object){

    this.loading = true;
    this.errorMessage = []

    setTimeout(() => {
      this.userService.changepassword(body).subscribe({
        next: (response) =>{
          this.passwordchanged = true
          setTimeout(() => {
            this.router.navigate(['./login'])
          }, 1500);
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
    }, 500);
  }

  registration(registrationForm: NgForm){
    if(this.validator.validation(registrationForm) && this.validator.equalValidation(this.password!, this.passwordrepeat!)){
      this.passwordValidated = false
      this.wasValidated = false
      const body = 
      {
        "password": this.password,
        "token": this.token
      }
    
        this.submit(body)
    }else{
      this.wasValidated = true
      this.passwordValidated = false
      if(!this.validator.equalValidation(this.password!, this.passwordrepeat!)){
        this.passwordValidated = true
      }
    }
  }

  

}
