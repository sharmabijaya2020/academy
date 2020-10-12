import { Component, OnInit, OnDestroy } from '@angular/core';

import { Router } from '@angular/router';

import { FormControl, FormGroup, Validator, Validators } from '@angular/forms'
import { AuthService } from '../auth.service';
import { UIService } from '../ui-service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  subscribeLoadingStatus: Subscription;
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    private uiService: UIService
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl("",
        {
          validators: [Validators.required, Validators.email]
        }),
      password: new FormControl("", {
        validators: [Validators.required]
      })
    })

  }

  login() {
    this.subscribeLoadingStatus = this.uiService.loadingStateChanged.subscribe(loadingState => this.isLoading = loadingState);
    let loginFormData = this.loginForm.value;
    // console.log(loginFormData)
    this.authService.login(loginFormData)

  }
  ngOnDestroy() {
    if (this.subscribeLoadingStatus) {
      this.subscribeLoadingStatus.unsubscribe()
    }

  }

}