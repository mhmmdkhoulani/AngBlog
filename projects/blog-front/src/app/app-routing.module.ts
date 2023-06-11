import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { SingleCategoryComponent } from './components/pages/single-category/single-category.component';
import { SinglePostComponent } from './components/pages/single-post/single-post.component';
import { AboutComponent } from './components/pages/about/about.component';
import { TermsAndConditionsComponent } from './components/pages/terms-and-conditions/terms-and-conditions.component';
import { ContactusComponent } from './components/pages/contactus/contactus.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'category/:category/:id', component: SingleCategoryComponent },
  { path: 'post/:id', component: SinglePostComponent },
  { path: 'about', component: AboutComponent },
  { path: 'terms-conditions', component: TermsAndConditionsComponent },
  { path: 'contact', component: ContactusComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
