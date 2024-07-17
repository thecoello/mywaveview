import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import User from '../../models/user';
import { ValidatorForm } from '../../packages/validatorForm';
import { NgFor, NgIf, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { UserService } from '../../services/users';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register-admin',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor, TitleCasePipe, UpperCasePipe],
  templateUrl: './register-admin.component.html',
  styleUrl: './register-admin.component.scss'
})
export class RegisterAdminComponent implements OnInit {
  registrationModel:User = new User()
  wasValidated:boolean = false
  passwordValidated:boolean = false
  errorMessage?:Array<string>
  validator: ValidatorForm = new ValidatorForm()
  registered: boolean = false
  loading: boolean = false
  userModel: User = new User()

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router){}

  ngOnInit(): void {
    const localSid = localStorage.getItem('userid')
    this.getUser(localSid!)
  }

  getUser(id: string){
    this.userService.getUser(id).subscribe({
      next:(response)=>{
        this.userModel = response

        if(this.userModel.usertype != "ADMIN"){
          this.router.navigate(['/'])
        }
      }
    })
  }


  private submit(user: User){

    this.loading = true;
    this.errorMessage = []

    setTimeout(() => {
      this.userService.createUser(user).subscribe({
        next: (response) =>{
          this.registered = true
          setTimeout(() => {
            this.router.navigate(['./admin/usersadmin'])
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
    if(this.validator.validation(registrationForm) && this.validator.equalValidation(this.registrationModel.password!, this.registrationModel.passwordrepeat!)){
      this.passwordValidated = false
      this.wasValidated = false
        this.registrationModel.companyname = ""
        this.registrationModel.country = ""
        this.registrationModel.region = ""
        this.registrationModel.usertype = "ADMIN"
        this.submit(this.registrationModel)

    }else{
      this.wasValidated = true
      this.passwordValidated = false
      if(!this.validator.equalValidation(this.registrationModel.password!, this.registrationModel.passwordrepeat!)){
        this.passwordValidated = true
      }
    }
  }
}
