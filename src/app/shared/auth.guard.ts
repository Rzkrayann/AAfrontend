import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from "./auth.service";
import {inject} from "@angular/core";

export const authGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthService);
  let router = inject(Router);


  if (authService.isAdmin()) {
    console.log('User is authenticated as an admin');
    return true;
  } else {
    console.log('User is not authenticated as an admin');
    router.navigate(['/home']);
    return false;
  }
};
