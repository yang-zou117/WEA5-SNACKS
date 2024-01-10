import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication-service.service';

@Component({
  selector: 'wea5-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  login: any = {
    username: '',
    password: ''
  }

  private returnTo: string = '';

  constructor(private auth: AuthenticationService, 
              private router: Router, 
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.returnTo = params['returnUrl'] || '';
    });

    // store api keys in local storage for each restaurant to simulate user login
    const apiKeys: { [key: string]: string } = {
      '1': 'testApiKey123',
      '2': 'testApiKey123',
      '3': 'testApiKey123'
    };
    localStorage.setItem('wea5-api-keys', JSON.stringify(apiKeys));

  }

  submitForm() {

    if (this.auth.login(this.login.username, this.login.password)) {
      this.router.navigateByUrl(this.returnTo);
    } else {
      alert('Login failed!');
    }
    
  }

  isLoggedIn() {
    return this.auth.isLoggedIn();
  }

  logout() {
    this.auth.logout();
  }

  editMenu() {
    this.router.navigateByUrl('/edit-menu');
  }

  editOrderStatus() {
    this.router.navigateByUrl('/edit-order-status');
  }

  getUsername() {
    return this.auth.getUsernameFromToken();
  }

}
