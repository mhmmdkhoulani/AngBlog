import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/main/dashboard/dashboard.component';
import { CategoriesComponent } from './components/main/categories/categories.component';
import { AllPostsComponent } from './components/main/Posts/all-posts/all-posts.component';
import { NewPostComponent } from './components/main/Posts/new-post/new-post.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'posts', component: AllPostsComponent },
  { path: 'posts/new', component: NewPostComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
