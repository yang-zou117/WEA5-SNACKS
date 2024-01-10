import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterRestaurantComponent } from './register-restaurant/register-restaurant.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { MyCartComponent } from './my-cart/my-cart.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { OAuthModule } from 'angular-oauth2-oidc';
import { LoggedInWelcomeComponent } from './logged-in-welcome/logged-in-welcome.component';
import { EditMenuComponent } from './edit-menu/edit-menu.component';
import { EditOrderStatusComponent } from './edit-order-status/edit-order-status.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterRestaurantComponent,
    HomeComponent,
    MyOrdersComponent,
    MyCartComponent,
    LoginComponent,
    SearchResultsComponent,
    LoggedInWelcomeComponent,
    EditMenuComponent,
    EditOrderStatusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    OAuthModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
