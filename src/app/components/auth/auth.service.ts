import { Injectable } from '@angular/core';
import { Router } from '@angular/router'

import { User } from '../auth/auth-model/user-model';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';

import { map } from 'rxjs/operators'
import { SnackbarComponent } from 'src/app/shared/snack-bar.component';
import { UIService } from './ui-service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated: boolean;



  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router,
    private matsnackbar: MatSnackBar,
    private uiService: UIService
  ) { }

  registerUser(formData: User) {
    this.uiService.loadingStateChanged.next(true);
    let user: User = {
      fname: formData["firstname"],
      mname: formData["middlename"],
      lname: formData["lastname"],
      email: formData["email"],
      phone: formData["phone"],
      password: formData["pw1"],
      dob: formData["dob"],
      gender: formData["gender"],
      grade: formData["grade"]
    }

    this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password).then(userData => {
      this.uiService.loadingStateChanged.next(false);
      if (userData["additionalUserInfo"]["isNewUser"]) {
        this.createUser(user);
        this.router.navigate(["login"]);
      }
    }).catch(error => {
      this.uiService.loadingStateChanged.next(false);
      this.matsnackbar.openFromComponent(SnackbarComponent, {
        duration: 5 * 1000,
        announcementMessage: error.message,
        data: error.message,

      });
      console.log(error);
    })
  }

  createUser(user) {
    this.uiService.loadingStateChanged.next(true);
    this.db
      .collection('users')
      .add(user)
      .then(userData => {
        this.uiService.loadingStateChanged.next(false);
        console.log(userData);
      }).catch(
        error => {
          this.uiService.loadingStateChanged.next(false);
          console.log(error
          )
        });
  }

  login(loginFormData: any) {
    this.uiService.loadingStateChanged.next(true);
    this.afAuth.auth.signInWithEmailAndPassword(loginFormData.email, loginFormData.password).then(loginData => {
      this.uiService.loadingStateChanged.next(false);
      this.isAuthenticated = true;
      this.authSuccessfully();
    }).catch(error => {
      this.uiService.loadingStateChanged.next(false);
      this.matsnackbar.openFromComponent(SnackbarComponent, {
        duration: 5 * 1000,
        data: error.message
      });
    })
  }

  authSuccessfully() {
    this.router.navigate(["dashboard"]);
  }

  retrieveUser() {
    this.uiService.loadingStateChanged.next(true);
    this.db
      .collection('users')
      .snapshotChanges()
      .pipe(map(usersArray => {
        console.log(usersArray)//
        return usersArray.map(user => {
          return {
            id: user.payload.doc.id,
            fname: user.payload.doc.data()["fname"],
            email: user.payload.doc.data()['email'],
            phone: user.payload.doc.data()['phone']
          }
        })
      })).subscribe(users => {
        this.uiService.loadingStateChanged.next(false);
        console.log(users);
      })
  }
}
