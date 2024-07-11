import { ApplicationConfig } from '@angular/core';
import { Router, RouterLink, provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { UserService } from './services/users';
import { ContractService } from './services/contract';
import { AditionalPointsService } from './services/aditionalPoints';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), Router, NgModel, NgForm, FormsModule, provideHttpClient(), HttpClientModule, UserService, ContractService, AditionalPointsService]
};
