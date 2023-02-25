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
}
