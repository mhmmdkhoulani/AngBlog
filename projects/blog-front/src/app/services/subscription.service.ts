import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subscriptions } from '../models/subscriptions';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(private afs: AngularFirestore, private toastr: ToastrService) { }

  addSub(sub: Subscriptions) {
    this.afs.collection('subscriptions').add(sub).then(ref => {
      this.toastr.success('Subscription added successfully.');

    }).catch(err => {
      this.toastr.warning(err);
    })
  }

  checkSub(email: string) {
    return this.afs.collection('subscriptions', ref => ref.where('email', '==', email)).get()
  }
}
