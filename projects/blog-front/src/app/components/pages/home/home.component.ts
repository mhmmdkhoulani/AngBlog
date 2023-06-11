import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  featuredPosts: Array<any> = [];
  latestPosts: Array<any> = [];
  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.loadFeaturedPosts().subscribe(value => {
      this.featuredPosts = value;
    });
    this.postService.loadLatestPosts().subscribe(value => {
      this.latestPosts = value;
    });

  }
}
