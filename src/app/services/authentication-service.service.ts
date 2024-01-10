import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {

  constructor(private oauthService: OAuthService) { } 

  login(username: string, password: string): boolean { 
    //this.oauthService.initImplicitFlow();
    this.oauthService.initCodeFlow(); // is recommended nowadays
    return true; 
  } 

  isLoggedIn() { 
    return this.oauthService.hasValidAccessToken() &&
    this.oauthService.hasValidIdToken(); 
  } 
}
