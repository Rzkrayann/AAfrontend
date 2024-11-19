import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from "./auth.service";
import {inject} from "@angular/core";

export const authGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthService);
  let router = inject(Router);

  // return authService.isAdmin()
  //   .then((authenticated: any) => {
  //     if(authenticated) {
  //       console.log("User is authenticated as an admin");
  //       return true;
  //     } else{
  //       console.log("User is not authenticated as an admin");
  //       router.navigate(['/home']);
  //       return false;
  //     }
  //   });

  if (authService.isAdmin()) {
    console.log('User is authenticated as an admin');
    return true;
  } else {
    console.log('User is not authenticated as an admin');
    router.navigate(['/home']);
    return false;
  }
};
