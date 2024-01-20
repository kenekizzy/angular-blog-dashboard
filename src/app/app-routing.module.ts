import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CategoryComponent } from './components/category/category.component';
import { AllPostsComponent } from './components/all-posts/all-posts.component';
import { NewPostsComponent } from './components/new-posts/new-posts.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './services/auth.guard';
import { SubscribersComponent } from './components/subscribers/subscribers.component';


const routes: Routes = [
  {path: '', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'categories', component: CategoryComponent, canActivate: [AuthGuard]},
  {path: 'posts', component: AllPostsComponent, canActivate: [AuthGuard]},
  {path: 'new-post', component: NewPostsComponent, canActivate: [AuthGuard]},
  {path: 'subscribers', component: SubscribersComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
