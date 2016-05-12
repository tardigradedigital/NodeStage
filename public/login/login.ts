import { Injectable } from '@angular/core';

declare var Auth0Lock: any;

@Injectable()
export class LoginService {
  lock = new Auth0Lock('jRop2sapEBB46vgXAuTWkYZGIvoGCQVp', 'tardigrade.auth0.com');
    
  login() {
    if(document.getElementById('login').getAttribute('data-lgld') == '0') {
      this.lock.show({
        closeable: false,
        disableResetAction: true,
        disableSignupAction: true,
        container: 'login',
        icon: '/img/login.png'
      }, (error: string, profile: Object, id_token: string) => {
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
      });
      document.getElementById('login').setAttribute('data-lgld', '1');
    }
  }
  
  logout() {
    localStorage.removeItem('profile');
    localStorage.removeItem('id_token');
  }
}