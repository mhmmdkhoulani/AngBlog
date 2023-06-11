import { Component, Input, OnInit } from '@angular/core';
import { PostService } from '../../../services/post.service';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})


export class PostCardComponent implements OnInit {
  @Input() postData: any | undefined;
  post: any;
  ngOnInit(): void {
    this.post = this.postData?.data;
  }


}
