import { Component } from '@angular/core';
import { EditUserComponent } from '../edit-user/edit-user.component';

@Component({
  selector: 'app-edit-user-main',
  standalone: true,
  imports: [EditUserComponent],
  templateUrl: './edit-user-main.component.html',
  styleUrl: './edit-user-main.component.scss'
})
export class EditUserMainComponent {
  urlParam?: string
}
