import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from '@modules/auth/services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  formLogin: FormGroup = new FormGroup({});
  errorSession: boolean = false;
  
  constructor(private _authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.formLogin = new FormGroup(
      {
        email: new FormControl('',[
          Validators.required,
          Validators.email
        ]),
        password: new FormControl('',[
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(18),
        ]),
      }
    )
  }

  sendLogin(): void {
    const {email, password} = this.formLogin.value;
    this._authService.sendCredentials(email,password)
      .subscribe(
        res => {
          console.log("🚀 ~ file: login-page.component.ts:35 ~ LoginPageComponent ~ sendLogin ~ res:", res)
          // const { tokenSession, data } = res;
          // this._cookie.set('token', tokenSession, 4, '/')
          this.router.navigate(['/', 'tracks'])
          return 
        },
        err => {
          this.errorSession = true;
          console.log("🚀 ~ file: login-page.component.ts:36 ~ LoginPageComponent ~ sendLogin ~ err:", err)
          return 
        }
      )
  }
}
