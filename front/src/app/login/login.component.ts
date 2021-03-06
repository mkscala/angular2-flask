import { Component, Injectable, ViewChild, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { NgForm }    from '@angular/common';
import { AuthenticationService } from '../authentication/authentication.service';
import { UserComponent } from '../utils/user';
import {   Router } from '@angular/router';
import { disableDeprecatedForms, provideForms } from '@angular/forms';



@Component({
  selector: `login`,
  template: require('./login.component.html'),
  styles: [require('./login.component.css')],
  // Here we tell Angular that we want the form
  // directives to be available in this component
  directives: [REACTIVE_FORM_DIRECTIVES],
  providers: [AuthenticationService]
})
export class LoginFormComponent implements OnInit {

  inputLogo = 'assets/img/angularclass-logo.png';
  model: UserComponent = new UserComponent(1, '', '');
  logintext: string = 'Sign in to continue to the portal';
  color: string = 'black';
  form: FormGroup;
  private forgotPassword: boolean = false;


  constructor(private _service: AuthenticationService, private router: Router) {
    let group: any = {};
    group.username = new FormControl('', Validators.required);
    group.password = new FormControl('', Validators.required);
    group.type = new FormControl('login');
    this.form = new FormGroup(group);
  }

  ngOnInit() {

  }

  loginUser() {

    let body = JSON.stringify({
      'email': this.form.value['username'],
      'password': this.form.value['password']
    });

    this._service.login(body)
      .subscribe(data => {
        this.router.navigate(['/home']);
      },
      error => {
        console.log('wrong password entered');
        this.logintext = 'Wrong password entered ! ';
        this.color = 'red';

      }
      );
  }
}
