import { Injectable } from '@angular/core';
import { GoogleAuthProvider } from '@angular/fire/auth';
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
  userData: any; // logged user

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private toastr: ToastrService,
  ) {
    this.afAuth.authState.subscribe((user) => {
      if(user) {
        this.userData = user;
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
        }
      )
      .catch((err) => {
        this.toastr.error('The email address is wrong', 'SignUp Error');
      })
  }

  async sendEmailVerification(user: any) {
    return await this.afAuth.currentUser
      .then((u: any) => {
        u.sendEmailVerification(),
        this.toastr.info('Your Confirmation Email Has Been Sent', 'Info');
      })
      .then(() => {
        this.router.navigate(['verify-email']);
      });
  }

  async updateDisplayName(user: firebase.User | null, firstName: string, lastName: string) {
    return await user?.updateProfile({
      displayName: `${firstName} ${lastName}`
    });
  }
  
  login(email: string,password: string) {
    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then(
        (res) => {
          if(res.user?.emailVerified == true) {
            localStorage.setItem('token', 'true');
            localStorage.setItem('user', JSON.stringify(res.user)); // DELETE
            this.setUserData(res.user);
            this.router.navigate(['/home']);
            this.toastr.success('You are Loged In', 'Success');
          } else {
            this.toastr.warning('Please confirm your account through email verification', 'Warning');
          }
        }
      )
      .catch((err) => {
        console.log(err.code)
        if(err.code == 'auth/too-many-requests') {
          this.toastr.error('Access to this account has been temporarily disabled due to many failed login attempts. Try again later', 'Login Error');
          return;
        } else if(err.code == 'auth/user-not-found') {
          this.toastr.error('There is no user record corresponding to this identifier. The user may have been deleted.', 'Login Error')
          return;;
        } else if(err.code == 'auth/wrong-password') {
          this.toastr.error('The password is invalid or the user does not have a password.', 'Login Error')
          return;;
        } else {
          this.toastr.error('The email adress or password is incorrect. Please try again', 'Login Error');
        }
      })
  }

  async googleLogin() {
    await this.authLogin(new GoogleAuthProvider());
  }

  async authLogin(provider: any) {
    return await this.afAuth
      .signInWithPopup(provider)
      .then(
        (res) => {
          if(res.user?.emailVerified == true) {
            this.afs
              .collection('users')
              .doc(res.user.uid)
              .get()
              .forEach((col) => {
                if(!col.exists) {
                  this.setUserData(res.user);
                  const userRef: AngularFirestoreDocument<any> = this.afs.doc(
                    `users/${res.user!.uid}`
                  );

                  const setUserData: any = {
                    firstName: res.user!.displayName?.split(' ')[0],
                    lastName: res.user!.displayName?.split(' ')[1]
                  };

                  userRef.set(setUserData, {
                    merge: true
                  });

                  // this.toastr.success('You are logged in with Google account', 'Success');
                } else {
                  // this.toastr.success('You are logged in with your existing Google account', 'Success');
                }
              });

            localStorage.setItem('token', 'true');
            localStorage.setItem('user', JSON.stringify(res.user)); // DELETE
            this.router.navigate(['home']);
          } else {
            this.toastr.warning('Please confirm your account through email verification', 'Warning');
            this.sendEmailVerification(res.user);
          }
        }
      )
      .catch((err) => {
        this.router.navigate(['/login']);
        if(err.code == 'auth/too-many-requests') {
          this.toastr.error(
            'Access to this account has been temporarily disabled due to many failed login attempts. Try again later', 
            'Login Error 1'
          );
          return;
        } else if(err.code == 'auth/user-not-found') {
          this.toastr.error(
            'There is no user record corresponding to this identifier. The user may have been deleted.', 
            'Login Error'
          );
          return;
        } else {
          this.toastr.error(
            'The email adress or password is incorrect. Please try again', 
            'Login Error'
          );
        }
      })
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

  async forgotPassword(email: string) {
    return await this.afAuth
      .sendPasswordResetEmail(email)
      .then(() => {
        this.router.navigate(['/login']);
        this.toastr.warning(
          'A password reset email has been sent to your email address. Please check your inbox.', 
          'Warning'
        );
      })
      .catch((err) => {
        this.toastr.error(
          'An error occurred while attempting to reset your password', 
          'Error'
        );
      });
  }

  // updatePassword() {

  // }

  async logout() {
    return await this.afAuth
      .signOut()
      .then(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.router.navigate(['/login']);
        // this.toastr.success(
        //   'You are successfully loged out', 
        //   'Success'
        // ); // !!!
      },
      (err) => {
        this.toastr.error(
          err.message, 
          'LogOut Error'
        );
      });
  }

  async deleteUserAccount() {
    await this.afAuth.currentUser
      .then(user => {
        localStorage.removeItem('token')!;
        localStorage.removeItem('user')!;
        this.afs.collection('users').doc(user?.uid).delete();
        user?.delete();
      })
      .catch(err => {
        this.toastr.error(
          'Error deleting users account', 
          'Error'
        );
      });
  }

}

