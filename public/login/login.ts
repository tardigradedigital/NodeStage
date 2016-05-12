import { Injectable, AfterContentInit, OnInit, AfterViewChecked, OnDestroy } from '@angular/core';

declare var Auth0Lock: any;
declare var $: any;

@Injectable()
export class LoginService implements AfterContentInit, OnInit, AfterViewChecked, OnDestroy {
  
  lock = new Auth0Lock('jRop2sapEBB46vgXAuTWkYZGIvoGCQVp', 'tardigrade.auth0.com');
  ngOnInit() { alert('Checkpoint 1'); this.login(); }
  ngAfterContentInit() { alert('Checkpoint 2'); this.login(); }
  ngAfterViewChecked() { alert('Checkpoint 3'); this.login(); }
  ngOnDestroy() { alert('Checkpoint 4'); this.login(); }
    
  login() {
    if($('#login').attr('data-lgld') == '0') {
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
      $('#login').removeAttr('data-lgld');
    }
  }
  
  logout() {
    localStorage.removeItem('profile');
    localStorage.removeItem('id_token');
  }
}