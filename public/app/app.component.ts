import { Component, provide, AfterContentInit, OnInit, AfterViewChecked } from '@angular/core'; /* Removed View from imports */
import { RouteConfig, Router, ROUTER_PROVIDERS, ROUTER_DIRECTIVES, CanActivate } from '@angular/router-deprecated'; /* Removed APP_BASE_HREF from imports */
import { HTTP_PROVIDERS, Http } from '@angular/http';
import { AuthHttp, tokenNotExpired } from 'angular2-jwt';
import { LoginService } from '../login/login';

@Component({
  selector: 'td-nodestage',
  templateUrl: '/login/login.html',
  providers: [LoginService]
})

/*
  TODO:
    D See if we can hide the validation error for Auth0Lock not being found
    * Running this.login() in the constructor stops page processing and does
      not output anything to td-nodestage. Instead of running directly in the
      constructor, set the state as a flag and have an event call at the end
      of page processing to trigger the login method.
*/
export class AppComponent implements AfterContentInit, OnInit, AfterViewChecked {
  ngOnInit() { alert('Checkpoint 1'); this.stageLogin(); }
  ngAfterContentInit() { alert('Checkpoint 2'); this.stageLogin(); }
  ngAfterViewChecked() { alert('Checkpoint 3'); this.stageLogin(); }
  ngOnDestroy() { alert('Checkpoint 4'); this.stageLogin(); }
  constructor(private auth0: LoginService) {}
  stageLoggedIn() { return tokenNotExpired(); }
  stageLogin() { this.auth0.login(); }
  stageLogout() { this.auth0.logout(); }
}