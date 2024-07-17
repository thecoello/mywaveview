import { Component, Input, OnInit, input } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import User from '../../models/user';
import { ValidatorForm } from '../../packages/validatorForm';
import { NgFor, NgIf, TitleCasePipe, UpperCasePipe } from '@angular/common';
import Country from '../../packages/country';
import { UserService } from '../../services/users';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor, TitleCasePipe, UpperCasePipe],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})
export class EditUserComponent implements OnInit {
  countries = new Country().countries
  userModel:User = new User()
  wasValidated:boolean = false
  passwordValidated:boolean = false
  errorMessage?:Array<string>
  validator: ValidatorForm = new ValidatorForm()
  registered: boolean = false
  loading: boolean = false
  @Input('urlParam')urlParam?: string

  constructor(private userService: UserService, private router: Router){}

  ngOnInit(): void {
    const localSid = localStorage.getItem('userid')
    if (this.urlParam) {
      this.getUser(this.urlParam)
    } else if (localSid) {
      this.getUser(localSid)
    }else{
      this.router.navigate(['/'])
    }
  }

  getUser(id: string){
    this.userService.getUser(id).subscribe({
      next:(response)=>{
        this.userModel = response
      }
    })
  }

  private submit(user: User){

    this.loading = true;
    this.errorMessage = []

    setTimeout(() => {
      this.userService.updateUser(user.id!, user).subscribe({
        next: (response) =>{
          this.registered = true
          setTimeout(() => {
          window.location.reload()
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
    if(this.validator.validation(registrationForm) && this.validator.equalValidation(this.userModel.password!, this.userModel.passwordrepeat!)){
      this.passwordValidated = false
      this.wasValidated = false
        this.submit(this.userModel)
    }else{
      this.wasValidated = true
      this.passwordValidated = false
      if(!this.validator.equalValidation(this.userModel.password!, this.userModel.passwordrepeat!)){
        this.passwordValidated = true
      }
    }
  }

  deleteUser(id: string){
    const btnDelete = confirm("Confir that you want to delete this user")

    if(btnDelete){
      this.userService.deleteUser(id).subscribe({
        next:()=>{
          if(!this.urlParam){
            this.userService.logout()
            localStorage.clear()
            window.location.reload()
          }else{
            this.router.navigate(['/'])
          }
        }
      })
    }

  }

}
