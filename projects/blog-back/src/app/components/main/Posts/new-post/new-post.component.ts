import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'projects/blog-back/src/app/models/category';
import { Post } from 'projects/blog-back/src/app/models/post';
import { CategoryService } from 'projects/blog-back/src/app/services/category-service.service';
import { PostService } from 'projects/blog-back/src/app/services/post.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {
  permalinkString: string = '';
  imgSrc: any = './assets/img-placeholder.jpg';
  selectedImage: any;
  categories: Array<any> = [];
  postForm: FormGroup;
  id: any;
  post?: any;
  formStatus = 'Add New';
  constructor(private categoryService: CategoryService, private fb: FormBuilder, private postService: PostService, private route: ActivatedRoute) {
    this.postForm = this.fb.group({
      title: [this.post?.title, [Validators.required, Validators.minLength(5)]],
      except: [this.post?.excerpt, [Validators.required, Validators.minLength(15)]],
      postImage: ['', [Validators.required]],
      category: [this.post?.category, [Validators.required]],
      content: [this.post?.content, [Validators.required]],
    });

    this.postForm.get('permalink')?.disable()
  }

  ngOnInit(): void {
    this.categoryService.loadData().subscribe(value => {
      this.categories = value;
    });

    this.route.queryParams.subscribe(value => {
      let idParam = value;
      idParam == null ? this.id = null : this.id = idParam.id;
      console.log(this.id);
    });

    if (this.id != null) {
      this.formStatus = 'Edit';
      this.postService.loadPost(this.id).subscribe((result) => {
        this.post = result;
        console.log(result);
        this.postForm.setValue({
          title: this.post.title,
          except: this.post.excerpt,
          category: `${this.post.category.id}-${this.post.category.name}`,
          content: this.post.content,
          postImage: ''
        });
        this.imgSrc = this.post.postImagePath;

        console.log(this.postForm);
      });
    }
  }

  get formControl() {
    return this.postForm.controls;
  }


  onTitleChanged($event: any) {
    const title: string = $event.target.value;
    this.permalinkString = title.replaceAll(' ', '-');

  }

  onImageChange($event: any) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imgSrc = e.target?.result;
    }
    reader.readAsDataURL($event.target.files[0]);
    this.selectedImage = $event.target.files[0]
  }

  onSubmit() {
    let value = this.postForm.value;
    let category = value.category.split('-');

    const post: Post = {
      title: value.title,
      permalink: this.permalinkString,
      category: { id: category[0], name: category[1] },
      postImagePath: '',
      content: value.content,
      excerpt: value.except,
      isFeatured: true,
      status: "New",
      createdAt: new Date(),
      views: 0
    }

    if (this.id != null) {
      this.postService.updateData(this.id, post, this.selectedImage,);
    } else {
      this.postService.saveDate(this.selectedImage, post, this.postForm);
    }



    this.imgSrc = './assets/img-placeholder.jpg';
  }

}
