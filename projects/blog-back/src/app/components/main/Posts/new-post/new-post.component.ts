import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'projects/blog-back/src/app/models/category';
import { CategoryService } from 'projects/blog-back/src/app/services/category-service.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {
  permalink: string = '';
  imgSrc: any = './assets/img-placeholder.jpg';
  selectedImage: any;
  categories: Array<any> = [];
  postForm: FormGroup;
  constructor(private categoryService: CategoryService, private fb: FormBuilder) {
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      permalink: ['', [Validators.required]],
      except: ['', [Validators.required, Validators.minLength(15)]],
      postImage: ['', [Validators.required]],
      category: ['', [Validators.required]],
      content: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.categoryService.loadData().subscribe(value => {
      this.categories = value;
    });
  }

  get formControl() {
    return this.postForm.controls;
  }

  onTitleChanged($event: any) {
    const title: string = $event.target.value;
    this.permalink = title.replaceAll(' ', '-');
    console.log(this.permalink);
  }

  onImageChange($event: any) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imgSrc = e.target?.result;
    }
    reader.readAsDataURL($event.target.files[0]);
    this.selectedImage = $event.target.files[0]
  }

}
