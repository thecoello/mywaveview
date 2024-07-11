import { Component, OnInit } from '@angular/core';
import AditionalPoints from '../../models/aditioanpoints';
import { AditionalPointsService } from '../../services/aditionalPoints';
import { ActivatedRoute } from '@angular/router';
import { ValidatorForm } from '../../packages/validatorForm';
import { FormsModule, NgForm } from '@angular/forms';
import { DatePipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-form-aditional-points',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor, DatePipe],
  templateUrl: './form-aditional-points.component.html',
  styleUrl: './form-aditional-points.component.scss'
})
export class FormAditionalPointsComponent implements OnInit {

  aditionaPModel:AditionalPoints = new AditionalPoints()
  validator: ValidatorForm = new ValidatorForm()
  loading: boolean = false
  wasValidated:boolean = false
  errorMessage?:Array<string>

  constructor(private aditionalPoints: AditionalPointsService, private route:ActivatedRoute){}

  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!)
    this.aditionaPModel.user_id = id
  }

  submit(loginForm: NgForm){
    if(this.validator.validation(loginForm)){
      
      const confirmAdd = confirm(`Confirm that you want to add ${this.aditionaPModel.points} points`)

      if(confirmAdd){
        this.loading = true;
        this.aditionalPoints.createAddPoints(this.aditionaPModel).subscribe({
          next: (response) =>{
            setTimeout(() => {
              window.location.reload()
              this.loading = false;
            }, 1500);
          },
          error: (error) => {
            console.log(error)
            for (const key in error.error) {
              error.error[key].forEach((message:string) => {
                this.errorMessage!.push(message)
              });
            }
            this.loading = false;
          }
        })
      }

    }else{
      this.wasValidated = true
    }
  }

}
