import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider } from '@angular/fire/auth';
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

  async signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this._auth, provider);
  }

  async signInWithFacebook() {
    const provider = new FacebookAuthProvider();
    return signInWithPopup(this._auth, provider);
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
