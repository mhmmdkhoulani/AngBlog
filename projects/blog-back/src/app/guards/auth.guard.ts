import { Inject, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toastr = inject(ToastrService);
  if (authService.isAuthenticate()) {
    console.log("access Granted");
    return true;

  } else {
    toastr.warning("You don't have permission to access this page")
    router.navigate(['/login']);
    return false;
  }
};
