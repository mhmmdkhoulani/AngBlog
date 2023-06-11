import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/main/dashboard/dashboard.component';
import { CategoriesComponent } from './components/main/categories/categories.component';
import { AllPostsComponent } from './components/main/Posts/all-posts/all-posts.component';
import { NewPostComponent } from './components/main/Posts/new-post/new-post.component';
import { LoginComponent } from './components/auth/login/login.component';
import { authGuard } from './guards/auth.guard';
import { SubscriptionComponent } from './components/main/subscription/subscription.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },

  { path: 'categories', component: CategoriesComponent, canActivate: [authGuard] },
  { path: 'posts', component: AllPostsComponent, canActivate: [authGuard] },
  { path: 'posts/new', component: NewPostComponent, canActivate: [authGuard] },
  { path: 'subscribers', component: SubscriptionComponent, canActivate: [authGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
