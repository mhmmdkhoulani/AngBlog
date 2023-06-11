import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedInGuard: boolean = false;
  constructor(private afauth: AngularFireAuth, private toastr: ToastrService, private router: Router) { }

  login(email: string, password: string) {
    this.afauth.signInWithEmailAndPassword(email, password).then(logRef => {
      this.toastr.success('Logged In Successfully.');
      this.loggedIn.next(true);
      this.isLoggedInGuard = true;
      this.router.navigate(['/']);

      this.loadUser();
    }).catch(err => {
      console.log(err);
      this.toastr.warning(err.message);
    });
  }

  loadUser() {
    this.afauth.authState.subscribe(user => {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.getItem('user');
    })
  }
  logout() {
    this.afauth.signOut().then(() => {
      this.toastr.success('User Logged Out Successfully.');
      this.loggedIn.next(false);
      this.isLoggedInGuard = false;
      localStorage.removeItem('user');

      this.router.navigate(['/login']);

    })
  }

  isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  isAuthenticate(): boolean {
    return this.isLoggedInGuard;
  }

}
