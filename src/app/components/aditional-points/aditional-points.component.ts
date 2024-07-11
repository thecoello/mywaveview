import { Component, OnInit } from '@angular/core';
import { ValidatorForm } from '../../packages/validatorForm';
import { FormsModule, NgForm } from '@angular/forms';
import { AditionalPointsService } from '../../services/aditionalPoints';
import AditionalPoints from '../../models/aditioanpoints';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormAditionalPointsComponent } from '../form-aditional-points/form-aditional-points.component';
import User from '../../models/user';
import { UserService } from '../../services/users';

@Component({
  selector: 'app-aditional-points',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor, DatePipe, FormAditionalPointsComponent],
  templateUrl: './aditional-points.component.html',
  styleUrl: './aditional-points.component.scss'
})
export class AditionalPointsComponent implements OnInit {
  errorMessage?: Array<string>
  aditionaPModelArr?: Array<AditionalPoints>
  pagination?: Array<any>
  wasValidated: boolean = false
  validator: ValidatorForm = new ValidatorForm()
  loading: boolean = false
  urlPoints: string = "http://127.0.0.1:8000/points"
  userModel: User = new User()

  constructor(private aditionalPoints: AditionalPointsService, private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!
    const localSid = localStorage.getItem('user_id')!

    if (id) {
      this.getAditionalPoints(id)
    } else if (localSid) {
      this.getAditionalPoints(localSid)
    }

    this.getUser(localSid)

  }

  getUser(id: string){
    this.userService.getUser(id).subscribe({
      next:(response)=>{
        this.userModel = response
      },
      error:()=>{

      }
    })
  }

  getAditionalPoints(id: string) {
    this.aditionalPoints.getAddPoints(id).subscribe({
      next: (response) => {
        if (response) {
          this.aditionaPModelArr! = response.data
          this.pagination = response.links
        }
      },
      error: (error) => {
        console.log(error)
        for (const key in error.error) {
          error.error[key].forEach((message: string) => {
            this.errorMessage!.push(message)
          });
        }
        this.loading = false;
      }
    })
  }

  removePoints(id: string) {
    const btnConfirm = confirm("Confirm that you want to remove these points")

    if (btnConfirm) {
      this.loading = true;
      this.aditionalPoints.deleteAddPoints(id).subscribe({
        next: (response) => {
          setTimeout(() => {
            window.location.reload()
            this.loading = false;
          }, 1500);
        },
        error: (error) => {
          for (const key in error.error) {
            error.error[key].forEach((message: string) => {
              this.errorMessage!.push(message)
            });
          }
          this.loading = false;
        }
      })
    }
  }
}