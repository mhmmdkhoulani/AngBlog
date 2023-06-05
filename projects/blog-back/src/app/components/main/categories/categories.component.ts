import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category-service.service';
import { Category } from '../../../models/category';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})

export class CategoriesComponent implements OnInit {

  categories: Array<any> = [];
  formCategory: string = '';
  categoryId: string = '';
  formStatus: string = 'Add';
  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.loadData().subscribe(value => {
      console.log(value);
      this.categories = value;
    });
  }

  onSubmit(form: NgForm) {
    let categoryData: Category = {
      name: form.value.category,
    };
    if (this.formStatus == 'Add') {
      this.categoryService.saveDate(categoryData, form);
    } else if (this.formStatus == 'Edit') {
      this.categoryService.updateData(this.categoryId, categoryData);
      this.formStatus = 'Add';
      form.reset();
    }


  }

  onEdit(category: string, id: string) {
    this.formCategory = category;
    this.formStatus = 'Edit';
    this.categoryId = id;
  }

  onDelete(id: string) {
    this.categoryService.deleteData(id);
  }
}
