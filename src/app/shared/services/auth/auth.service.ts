import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  getAuth,
  updateEmail,
  sendEmailVerification,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
  deleteUser,
} from 'firebase/auth';
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
        this.router.navigate(['/login']);
        this.toastService.show(
          'Your Confirmation Email Sent', 
          { 
            classname: 'success', 
            delay: 5000 
          }
        );
        // this.modalService.open(content, { centered: true });
        this.sendEmailVerification(res.user);
      },
        (err) => {
          console.log(err);
          this.toastService.show(
            // 'Something got wrong ',
            'The email address is wrong', 
            { 
              classname: 'error', 
              delay: 5000 
            }
          );
        }
      )
      
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
            this.router.navigate(['/home']);
          } else {
            this.toastService.show(
              'Confirm your account through email verification', 
              { 
                classname: 'info', 
                delay: 5000 
              }
            );
            this.sendEmailVerification(res.user);
          }
        },
        (err) => {
          if (err.code == 'auth/too-many-requests') {
            this.toastService.show(
              'Access to this account has been temporarily disabled due to many failed login attempts. Try again later', 
              { 
                classname: 'warning', 
                delay: 5000 
              }
            );
            return;
          }
          this.toastService.show(
            'The email adress or password is incorrect. Please try again', 
            { 
              classname: 'warning', 
              delay: 5000 
            }
          );
          this.router.navigate(['/login']);
        }
      );
  }

  // ------------------------------------------------------------------
  signOut() {
    this.afAuth.signOut()
      .then(() => {
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
          this.toastService.show(
            'You are signed out.', 
            { 
              classname: 'info', 
              delay: 5000 
            }
          );
        },
        (err) => {
          this.toastService.show(
            err.message, 
            { 
              classname: 'warning', 
              delay: 5000 
            }
          );
        }
      );
  }

  // ------------------------------------------------------------------
deleteAccount() {
  // const dialogRef = this.dialog.open(DialogComponent, {
  //   data: {
  //     title: 'Delete Confirmation',
  //     description:
  //       'Deleting this data will permanently remove your account, and this cannot be recovered.',
  //   },
  // });
  // dialogRef.afterClosed().subscribe((result) => {
  //   if (result == true) {
  //     this.dialog
  //       .open(PasswordDialogComponent)
  //       .afterClosed()
  //       .subscribe((result) => {
  //         if (result == true) {
  //           const user = getAuth().currentUser;
  //           if (user && user.email) {
  //             const credential = EmailAuthProvider.credential(
  //               user.email,
  //               this.password
  //             );
  //             reauthenticateWithCredential(user, credential).then(
  //               () => {
  //                 deleteUser(user).then(() => {
  //                   sendEmailVerification(user).then(() => {});
  //                 });
  //                 this.router.navigate(['/login']);
  //                 this.openSnackBar('Account deleted', 'X');
  //               },
  //               (error) => {
  //                 this.openSnackBar(
  //                   'The password is incorrect. Please try again',
  //                   'X'
  //                 );
  //               }
  //             );
  //           }
  //           return;
  //         }
  //         this.openSnackBar('You have cancelled', 'X');
  //       });
  //   }
  // });
  }

}



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