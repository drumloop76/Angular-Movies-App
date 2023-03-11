import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase/compat';
import { ToastrService } from 'ngx-toastr';
import { UserData } from '../../models/userData';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private toastr: ToastrService,
  ) { 
    // OPTIONAL !!!
    this.afAuth.authState.subscribe((user) => {
      if(user) {
        localStorage.setItem('user', JSON.stringify(user));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  signUp(firstName: string, lastName: string, email: string,password: string) {
    this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then(
        (res) => {
          if(res.user) {
            this.afs.collection('users').doc(res.user.uid).set({
              firstName: firstName,
              lastName: lastName,
              email: email,
              password: password
            });
          }
          this.sendEmailVerification(res.user);
          this.updateDisplayName(res.user, firstName, lastName)
          this.router.navigate(['/login']);
          this.toastr.info('Your Confirmation Email Has Been Sent', 'Info');
        },
        (err) => {
          this.toastr.error('The email address is wrong', 'SignUp Error')
        }
      )
  }
  
  // -------------------- EmailVerification / DisplayName----------------------------------------------

  sendEmailVerification(user: any) {
    user.sendEmailVerification();
  }

  async updateDisplayName(user: firebase.User | null, firstName: string, lastName: string) {
    return await user?.updateProfile({
      displayName: `${firstName} ${lastName}`
    });
  }

  // ------------------------------------------------------------------
  login(email: string,password: string) {
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then(
        (res) => {
          if(res.user?.emailVerified == true) {
            localStorage.setItem('token', 'true');
            this.setUserData(res.user);
            this.router.navigate(['/home']);
            this.toastr.success('You are Loged In', 'Success');
          } else {
            this.toastr.warning('Confirm your account through email verification', 'Warning');
          }
        },
        (err) => {
          if(err.code == 'auth/too-many-requests') {
            this.toastr.error('Access to this account has been temporarily disabled due to many failed login attempts. Try again later', 'Login Error');
            return;
          } else if(err.code == 'auth/user-not-found') {
            this.toastr.error('There is no user record corresponding to this identifier. The user may have been deleted.', 'Login Error');
          } else {
            this.toastr.error('The email adress or password is incorrect. Please try again', 'Login Error');
          }
        }
      );
  }

  async setUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );

    const userData: UserData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };

    return await userRef.set(userData, {
      merge: true
    });
  }

  get isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return token !== null;
  }

  // ------------------------------------------------------------------
  
  logout() {
    this.afAuth
      .signOut()
      .then(() => {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          this.router.navigate(['/login']);
        },
        (err) => {
          this.toastr.error(err.message, 'LogOut Error');
        }
      );
  }

  // -------------------- DELETE ----------------------------------------------
  
  async deleteUserAccount() {
    await this.afAuth.currentUser
      .then(user => {
        localStorage.removeItem('token')!;
        localStorage.removeItem('user')!;
        this.afs.collection('users').doc(user?.uid).delete();
        user?.delete();
      })
      .catch(err => {
        this.toastr.error('Error deleting user', 'Delete Account Error');
      });
  }

}

