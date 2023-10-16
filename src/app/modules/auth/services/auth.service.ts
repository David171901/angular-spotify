import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  sendCredentials(email: string, password: string) {
    console.log("🚀 ~ file: auth.service.ts:11 ~ AuthService ~ sendCredentials ~ password:", password)
    console.log("🚀 ~ file: auth.service.ts:11 ~ AuthService ~ sendCredentials ~ email:", email)
    
  }
}
