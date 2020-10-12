import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../auth-model/user-model'
import { Role } from '../auth-model/role.model';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  roles: Role[] = [];

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.retrieveUser();
    this.roles = [
      { value: "Principal", viewValue: "Principal" },
      { value: "Class-Teacher", viewValue: "Class-Teacher" },
      { value: "Teacher", viewValue: "Teacher" },
      { value: "Student", viewValue: "Student" },
      { value: "Parent", viewValue: "Parent" }
    ]
  }

  onSubmitSignupForm(form) {
    let formData = form.value;
    this.authService.registerUser(formData)
    // console.log(form)
  }


}

