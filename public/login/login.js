"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var LoginService = (function () {
    function LoginService() {
        this.lock = new Auth0Lock('jRop2sapEBB46vgXAuTWkYZGIvoGCQVp', 'tardigrade.auth0.com');
    }
    LoginService.prototype.login = function () {
        var _this = this;
        if ($('#login').attr('data-lgld') == '0') {
            this.lock.show({
                closeable: false,
                disableResetAction: true,
                disableSignupAction: true,
                container: 'login',
                icon: '/img/login.png'
            }, function (error, profile, id_token) {
                var hash = _this.lock.parseHash();
                if (hash) {
                    if (hash.error)
                        console.log('There was an error logging in', hash.error);
                    else
                        _this.lock.getProfile(hash.id_token, function (err, profile) {
                            if (err) {
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
    };
    LoginService.prototype.logout = function () {
        localStorage.removeItem('profile');
        localStorage.removeItem('id_token');
    };
    LoginService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], LoginService);
    return LoginService;
}());
exports.LoginService = LoginService;
//# sourceMappingURL=login.js.map