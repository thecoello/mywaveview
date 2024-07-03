import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { RegistrationLoginComponent } from './components/registration-login/registration-login.component';
import { FormContractsComponent } from './components/form-contracts/form-contracts.component';
import { ListPartnerUsersComponent } from './components/list-partner-users/list-partner-users.component';
import { ListContractsComponent } from './components/list-contracts/list-contracts.component';
import { AdminContractsComponent } from './components/admin-contracts/admin-contracts.component';
import { GlobalTableComponent } from './components/global-table/global-table.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'registration', component: RegistrationLoginComponent},
    {path: 'login', component: RegistrationLoginComponent},
    {path: 'admin/users', component: ListPartnerUsersComponent},
    {path: 'admin/contracts/:id', component: AdminContractsComponent},
    {path: 'newcontract', component: FormContractsComponent},
    {path: 'scores', component: GlobalTableComponent }
];
