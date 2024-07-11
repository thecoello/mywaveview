import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegistrationLoginComponent } from './components/registration-login/registration-login.component';
import { FormContractsComponent } from './components/form-contracts/form-contracts.component';
import { ListPartnerUsersComponent } from './components/list-partner-users/list-partner-users.component';
import { AdminContractsComponent } from './components/admin-contracts/admin-contracts.component';
import { GlobalTableComponent } from './components/global-table/global-table.component';
import { EditUserMainComponent } from './components/edit-user-main/edit-user-main.component';
import { RegisterAdminComponent } from './components/register-admin/register-admin.component';
import { ListAdminUsersComponent } from './components/list-admin-users/list-admin-users.component';
import { EditAdminUserComponent } from './components/edit-admin-user/edit-admin-user.component';
import { ForgotpComponent } from './components/forgotp/forgotp.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'registration', component: RegistrationLoginComponent},
    {path: 'login', component: RegistrationLoginComponent},
    {path: 'recoverpassword', component: ForgotpComponent},
    {path: 'points', component: AdminContractsComponent},
    {path: 'newcontract', component: FormContractsComponent},
    {path: 'scores', component: GlobalTableComponent },
    {path: 'admin/users', component: ListPartnerUsersComponent},
    {path: 'admin/contracts/:id', component: AdminContractsComponent},
    {path: 'admin/usersadmin', component: ListAdminUsersComponent},
    {path: 'admin/edituseradmin/:id', component: EditAdminUserComponent},
    {path: 'admin/registeradmin', component: RegisterAdminComponent},
    {path: 'edituser', component: EditUserMainComponent},
];