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
var core_1 = require('@angular/core'); /* Removed View from imports */
var login_1 = require('../login/login');
var AppComponent = (function () {
    function AppComponent(auth0) {
        this.auth0 = auth0;
    }
    AppComponent.prototype.login = function () { this.auth0.login(); };
    AppComponent.prototype.logout = function () { this.auth0.logout(); };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'td-nodestage',
            templateUrl: '/login/login.html',
            providers: [login_1.LoginService]
        }), 
        __metadata('design:paramtypes', [login_1.LoginService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map