import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Category } from '../models/category';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private afs: AngularFirestore, private toastr: ToastrService) { }

  saveDate(categoryData: Category, form: NgForm) {
    this.afs.collection('categories').add(categoryData).then(docRef => {
      this.toastr.success('Category inserted successfully.');
      form.form.reset();
    }).catch(err => { console.log(err) });
  }

  loadData() {
    return this.afs.collection('categories').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, data };
        })
      })
    )
  };

  updateData(id: string, data: Category) {
    this.afs.collection('categories').doc(id).update(data).then(docRef => {
      this.toastr.success('Category updated successfully.');
    }).catch(err => { console.log(err) });
  }

  deleteData(id: string) {
    this.afs.collection('categories').doc(id).delete().then(docRef => {
      this.toastr.success('Category deleted successfully.');
    }).catch(err => { console.log(err) });
  }
}
