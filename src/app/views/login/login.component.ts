import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  rolePressed;
  loggingIn = false;
  model: any = {};
  error = '';
  loginData = {
    username: '',
    password: '',
    role: '',
  };

  usernameFormControl = new FormControl('', [
    Validators.required,
  ]);
  roleFormControl = new FormControl('', [
    Validators.required,
  ]);
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
  ]);

  @Input() brandName = 'Test';

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.authenticationService.logout();
    this.usernameFocus();
  }

  usernameFocus(){
    document.getElementById('usernameField').focus();
  }

  passwordFocus(){
    document.getElementById('passwordField').focus();
  }

  roleFocus(){
    document.getElementById('roleField').focus();
  }

  usernamePressed(){
    if(this.loginData.username=='')
        this.usernameFocus();   
    else
      {
        this.error='';
        this.passwordFocus();
      }  
  }

  passwordPressed(){
    this.login();
  }

  login() {
    this.loggingIn = true;
    this.authenticationService.login(this.loginData.username, this.loginData.password, this.loginData.role)
    .subscribe(result => {
      if (result === true  && (localStorage.getItem('role'))) {
        this.router.navigate(['/kyc']);
      } else {
        this.error = 'Username, password, role combination is incorrect';
        this.loggingIn = false;
        this.passwordFocus();
        this.loginData.password = '';
      }
    });
  }

}
