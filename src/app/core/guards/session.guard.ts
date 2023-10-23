import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const sessionGuard: CanActivateFn = (route, state) => {

  const cookieService = inject(CookieService);
  const router = inject(Router);

  try {
    const token: boolean = cookieService.check('token')
    if(token) return true;
    else {
      router.navigate(['/','auth'])
      return false;
    }
  } catch(e) {
    return false;
  }
};
