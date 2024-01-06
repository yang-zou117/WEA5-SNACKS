import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterRestaurantComponent } from './register-restaurant/register-restaurant.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { LoginComponent } from './login/login.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { MyCartComponent } from './my-cart/my-cart.component';

const routes: Routes = [
{
  path: '',
  redirectTo: 'home',
  pathMatch: 'full'
},
{
  path: 'home',
  component: HomeComponent
},
{
  path: 'register', 
  component: RegisterRestaurantComponent
}, 
{
  path: 'search-results',
  component: SearchResultsComponent
}, 
{
  path: 'login',
  component: LoginComponent
}, 
{
  path: 'my-orders',
  component: MyOrdersComponent
}, 
{
  path: 'my-cart',
  component: MyCartComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
