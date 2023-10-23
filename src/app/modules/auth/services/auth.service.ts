import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = environment.api;

  constructor( private _http: HttpClient, private _cookie: CookieService ) { }
  // constructor( private _http: HttpClient ) { }

  sendCredentials(email: string, password: string): Observable<any> {
    const body = {
      email,
      password,
    }
    return this._http.post(`${this.URL}/auth/login`,body).pipe(
      tap((res: any) => {
        console.log("🚀 ~ file: auth.service.ts:23 ~ AuthService ~ tap ~ res:", res)
        const { tokenSession, data } = res;
        this._cookie.set('token', tokenSession, 4, '/')
      })
    )
  }
}
