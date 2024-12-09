import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';

interface User {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})

export class AuthService {

  constructor(private _auth: Auth, private firestore: Firestore) { }

  signUp(email: string, password: string) {
    return createUserWithEmailAndPassword(this._auth, email, password);
  }

  signIn(email: string, password: string) {
    return signInWithEmailAndPassword(this._auth, email, password);
  }

  createUserName(userName: string, userId: string) {
    const userDoc = doc(this.firestore, `users/${userId}`);
    setDoc(userDoc, {
      username: userName
    }).then((res) => {
      console.log('Documento creado correctamente', res);
    }).catch((error) => {
      console.log('Error al crear el documento', error);
    });
  }

  signOut() {
    return this._auth.signOut();
  }
}
