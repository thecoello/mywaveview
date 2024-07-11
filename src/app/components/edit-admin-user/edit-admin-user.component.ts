import { Component, OnInit } from '@angular/core';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-admin-user',
  standalone: true,
  imports: [EditUserComponent],
  templateUrl: './edit-admin-user.component.html',
  styleUrl: './edit-admin-user.component.scss'
})
export class EditAdminUserComponent implements OnInit {
  urlParam?: string

  constructor(private route: ActivatedRoute, private router: Router){}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!
    if (id) {
      this.urlParam = id
    } else {
      this.router.navigate(['./admin/usersadmin'])
    }
  }

 
}
