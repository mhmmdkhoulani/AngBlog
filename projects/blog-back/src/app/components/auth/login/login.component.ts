import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  constructor(private service: AuthService) { }

  onSubmit(loginForm: NgForm) {
    let formValues = loginForm.value;
    this.service.login(formValues.email, formValues.password);
  }
}
