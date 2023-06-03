import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layouts/header/header.component';
import { CategoryNavbarComponent } from './components/layouts/category-navbar/category-navbar.component';
import { FooterComponent } from './components/layouts/footer/footer.component';
import { HomeComponent } from './components/pages/home/home.component';
import { SingleCategoryComponent } from './components/pages/single-category/single-category.component';
import { SinglePostComponent } from './components/pages/single-post/single-post.component';
import { TermsAndConditionsComponent } from './components/pages/terms-and-conditions/terms-and-conditions.component';
import { ContactusComponent } from './components/pages/contactus/contactus.component';
import { AboutComponent } from './components/pages/about/about.component';
import { SubscriptionFormComponent } from './components/forms/subscription-form/subscription-form.component';
import { CommentFormComponent } from './components/comments/comment-form/comment-form.component';
import { CommentsListComponent } from './components/comments/comments-list/comments-list.component';
import { PostCardComponent } from './components/posts/post-card/post-card.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CategoryNavbarComponent,
    FooterComponent,
    HomeComponent,
    SingleCategoryComponent,
    SinglePostComponent,
    TermsAndConditionsComponent,
    ContactusComponent,
    AboutComponent,
    SubscriptionFormComponent,
    CommentFormComponent,
    CommentsListComponent,
    PostCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
