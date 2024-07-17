import { ApplicationConfig } from '@angular/core';
import { Router, RouterLink, provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { UserService } from './services/users';
import { ContractService } from './services/contract';
import { AditionalPointsService } from './services/aditionalPoints';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withHashLocation()), Router, NgModel, NgForm, FormsModule, provideHttpClient(), HttpClientModule, UserService, ContractService, AditionalPointsService]
};
