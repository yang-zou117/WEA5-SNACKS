import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private oauthService: OAuthService) { } 

  login(): boolean { 
    this.oauthService.initCodeFlow(); 
    return true; 
  } 

  isLoggedIn() { 
    return this.oauthService.hasValidAccessToken() &&
    this.oauthService.hasValidIdToken(); 
  } 

  logout() {
    this.oauthService.logOut();
  }

  getUsernameFromToken(): string {
    try {
      const token = this.oauthService.getIdToken();
      const decodedToken: any = jwtDecode(token);
      // Assuming the username is stored in the 'preferred_username' claim
      return decodedToken?.preferred_username || null;
      // Replace 'preferred_username' with the correct claim name where the username is stored in your token
    } catch (error) {
      console.error('Error decoding token:', error);
      return 'null';
    }
  }
}
