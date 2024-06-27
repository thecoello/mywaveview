import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { RegistrationLoginComponent } from './components/registration-login/registration-login.component';
import { FormContractsComponent } from './components/form-contracts/form-contracts.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'registration', component: RegistrationLoginComponent},
    {path: 'login', component: RegistrationLoginComponent},
    {path: 'newcontract', component: FormContractsComponent}
];
