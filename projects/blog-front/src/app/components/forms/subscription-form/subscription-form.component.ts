import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscriptions } from '../../../models/subscriptions';
import { SubscriptionService } from '../../../services/subscription.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-subscription-form',
  templateUrl: './subscription-form.component.html',
  styleUrls: ['./subscription-form.component.css']
})
export class SubscriptionFormComponent {

  isSuccessMessage: boolean = false;
  constructor(private subService: SubscriptionService, private toastr: ToastrService) { }
  onSubmit(subFrom: NgForm) {
    console.log(subFrom.value);
    const subValues: Subscriptions = {
      name: subFrom.value.Name,
      email: subFrom.value.email
    };
    this.subService.checkSub(subValues.email).subscribe(value => {
      if (value.empty) {
        this.subService.addSub(subValues);
        subFrom.resetForm();
        this.isSuccessMessage = true;
      } else {
        this.toastr.warning('This email is already subscribed');
      }
    })


  }
}
