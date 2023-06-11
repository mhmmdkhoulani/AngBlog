import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(private afs: AngularFirestore, private toastr: ToastrService) { }

  loadData() {
    return this.afs.collection('subscriptions').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, data };
        })
      })
    )
  };

  deleteData(id: string) {
    this.afs.collection('subscriptions').doc(id).delete().then(docRef => {
      this.toastr.success('Subscription deleted successfully.');
    }).catch(err => { console.log(err) });
  }
}
