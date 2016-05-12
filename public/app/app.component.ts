import { bootstrap } from '@angular/platform-browser';
import { Component, View, provide } from '@angular/core';
import { RouteConfig, Router, APP_BASE_HREF, ROUTER_PROVIDERS, ROUTER_DIRECTIVES, CanActivate } from '@angular/router';
import { HTTP_PROVIDERS, Http } from '@angular/http';
import { AuthHttp, tokenNotExpired } from 'angular2-jwt';

@Component({
  selector: 'td-nodestage',
  template: `
    <h2>Tardigrade Node Stage</h2>
    <button *ngIf="!loggedIn()" (click)="login()">Login</button>
    <button *ngIf="loggedIn()" (click)="logout()">Logout</button>
  `
})
export class AppComponent {
  lock = new Auth0Lock('jRop2sapEBB46vgXAuTWkYZGIvoGCQVp', 'tardigrade.auth0.com');
  
  constructor() {}
  
  login() {
    var hash = this.lock.parseHash();
    if(hash) {
      if(hash.error) console.log('There was an error logging in', hash.error);
      else this.lock.getProfile(hash.id_token, function(err, profile) {
        if(err) {
          console.log(err);
          return;
        }
        localStorage.setItem('profile', JSON.stringify(profile));
        localStorage.setItem('id_token', hash.id_token);
      });
    }
  }
  
  logout() {
    localStorage.removeItem('profile');
    localStorage.removeItem('id_token');
  }
  
  loggedIn() {
    return tokenNotExpired();
  }
}