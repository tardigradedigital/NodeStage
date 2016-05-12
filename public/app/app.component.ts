import { bootstrap } from '@angular/platform-browser-dynamic';
import { Component, View, provide } from '@angular/core';
import { RouteConfig, Router, APP_BASE_HREF, ROUTER_PROVIDERS, ROUTER_DIRECTIVES, CanActivate } from '@angular/router-deprecated';
import { HTTP_PROVIDERS, Http } from '@angular/http';
import { AuthHttp, tokenNotExpired } from 'angular2-jwt';

@Component({
  selector: 'td-nodestage',
  templateUrl: '/login/login.html'
})

export class AppComponent {
  lock = new Auth0Lock('jRop2sapEBB46vgXAuTWkYZGIvoGCQVp', 'tardigrade.auth0.com');
  
  constructor() {
    if(!this.loggedIn()) this.login();
  }
  
  login() {
    this.lock.show({
      closeable: false,
      disableResetAction: true,
      disableSignupAction: true,
      container: 'login',
      icon: '/img/login.png'
    });
    
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