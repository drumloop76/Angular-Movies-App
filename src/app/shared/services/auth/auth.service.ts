import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private toastService: ToastService,
  ) { }

  signUp(firstName: string, lastName: string, email: string,password: string) {
    this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((res) => {
        if(res.user) {
          this.afs.collection('users').doc(res.user.uid).set({
            firstname: firstName,
            lastName: lastName,
            email: email,
            password: password
          });
        }
        // this.router.navigate(['/login']);
        this.toastService.show(
          'The email address is wrong', 
          { 
            classname: 'success', 
            delay: 5000 
          }
        );
        // this.modalService.open(content, { centered: true });
        // this.sendEmailVerification(res.user);
      },
        (err) => {
          console.log(err);
          this.toastService.show(
            'The email address is wrong', 
            { 
              classname: 'error', 
              delay: 5000 
            }
          );
        }
      )
      // .catch((err) => {
      //   console.log(err, 'catched')
      //   this.toastService.show(
      //     'The email address is wrong', 
      //     { 
      //       classname: 'error', 
      //       delay: 5000 
      //     }
      //   );
      //   // this.handleError(err)
      // })
  }
  
  // ------------------------------------------------------------------
  sendEmailVerification(user: any) {
    user.sendEmailVerification();
  }

  // ------------------------------------------------------------------
  login(email: string,password: string) {
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then(
        (res) => {
          if (res.user?.emailVerified == true) {
            localStorage.setItem('token', 'true');
            // this.getSessionTmdb();
            // this.router.navigate(['/ngmovies/subscriptions']);
          } else {
            console.log('Confirm your account through email verification')
            // this.openSnackBar(
            //   'Confirm your account through email verification',
            //   'X'
            // );
            this.sendEmailVerification(res.user);
          }
        },
        (err) => {
          if (err.code == 'auth/too-many-requests') {
            console.log('Access to this account has been temporarily disabled due to many failed login attempts. Try again later')
            // this.openSnackBar(
            //   'Access to this account has been temporarily disabled due to many failed login attempts. Try again later',
            //   'X'
            // );
            return;
          }
          console.log('The email adress or password is incorrect. Please try again')
          // this.openSnackBar(
          //   'The email adress or password is incorrect. Please try again',
          //   'X'
          // );
          this.router.navigate(['/login']);
        }
      );
  }
}
