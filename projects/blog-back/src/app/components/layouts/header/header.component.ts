import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  email: string = '';
  loggedIn$: Observable<boolean> = new Observable<boolean>();
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    let currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    this.email = currentUser.email
    this.loggedIn$ = this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
  }




}
