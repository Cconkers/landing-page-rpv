import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';

interface User {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})

export class AuthService {

  constructor(private _auth: Auth) { }

  signUp(email: string, password: string) {
    return createUserWithEmailAndPassword(this._auth, email, password);
  }

  signOut() {
    return this._auth.signOut();
  }
}
