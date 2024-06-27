import { ApplicationConfig } from '@angular/core';
import { Router, RouterLink, provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { FormsModule, NgForm, NgModel } from '@angular/forms';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), Router, NgModel, NgForm, FormsModule]
};
