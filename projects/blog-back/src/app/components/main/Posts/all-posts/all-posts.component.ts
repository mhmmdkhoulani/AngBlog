import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'projects/blog-back/src/app/services/post.service';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']
})
export class AllPostsComponent implements OnInit {
  posts: Array<any> = [];

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.loadData().subscribe(value => {
      this.posts = value;
    });


  }

  onEdit(postTitle: string, postId: string) { }
  onDelete(postId: string, imagePath: string) {
    this.postService.deleteData(imagePath, postId);
  }

  isFeatured(id: string, featured: boolean) {
    const featuredData = { isFeatured: featured };
    this.postService.isFeatured(id, featuredData);
  }
}