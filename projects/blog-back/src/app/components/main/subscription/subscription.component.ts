import { Component } from '@angular/core';
import { CategoryService } from '../../../services/category-service.service';
import { Category } from '../../../models/category';
import { NgForm } from '@angular/forms';
import { SubscriptionService } from '../../../services/subscription.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent {
  subscriptions: Array<any> = [];
  formCategory: string = '';
  categoryId: string = '';
  formStatus: string = 'Add';
  constructor(private services: SubscriptionService) { }

  ngOnInit(): void {
    this.services.loadData().subscribe(value => {
      console.log(value);
      this.subscriptions = value;
    });
  }

  onSubmit(form: NgForm) {
    let categoryData: Category = {
      name: form.value.category,
    };


  }

  onEdit(category: string, id: string) {
    this.formCategory = category;
    this.formStatus = 'Edit';
    this.categoryId = id;
  }

  onDelete(id: string) {
    this.services.deleteData(id);
  }
}
