import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-category-navbar',
  templateUrl: './category-navbar.component.html',
  styleUrls: ['./category-navbar.component.css']
})
export class CategoryNavbarComponent implements OnInit {

  categories: Array<any> = [];

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.loadData().subscribe(value => {
      this.categories = value;
    });
  }

}
