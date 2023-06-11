import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../services/post.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-category',
  templateUrl: './single-category.component.html',
  styleUrls: ['./single-category.component.css']
})
export class SingleCategoryComponent implements OnInit {
  id: string = '';
  categoryName = '';

  posts: Array<any> = [];
  constructor(private postService: PostService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(value => {
      this.categoryName = value.category;
      this.postService.loadPostsByCategory(value.id).subscribe(values => {
        this.posts = values;



      })
    });



  }

}
