import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterRestaurantComponent } from './register-restaurant/register-restaurant.component';

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
  redirectTo: 'searchResults',
}, 
{
  path: 'login',
  redirectTo: 'login'
}, 
{
  path: 'my-orders',
  redirectTo: 'myOrders'
}, 
{
  path: 'my-cart',
  redirectTo: 'myCart'
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
