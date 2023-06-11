import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../services/post.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {

  post: any;
  similarPosts: Array<any> = [];
  constructor(private postService: PostService, private route: ActivatedRoute) {

  }
  ngOnInit(): void {
    this.route.params.subscribe(value => {
      this.postService.countViews(value.id);
      this.postService.loadPost(value.id).subscribe(post => {
        this.post = post;
        this.loadSimilarPosts(this.post.category.id);
        
      });
      
    })

  }
  loadSimilarPosts(id: string) {
    this.postService.loadSimilarPosts(id).subscribe(posts => {
      this.similarPosts = posts;
    })
  }


}
