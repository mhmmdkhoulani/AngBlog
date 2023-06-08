import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Post } from '../models/post';
import { FormGroup, NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private storage: AngularFireStorage,
    private afs: AngularFirestore,
    private toastr: ToastrService,
    private router: Router) { }

  saveDate(selectedImage: any, postData: Post, form: FormGroup) {
    const filePath = `postImage/${Date.now()}`;
    this.storage.upload(filePath, selectedImage).then(() => {
      console.log('Image uploaded successfully');
      this.storage.ref(filePath).getDownloadURL().subscribe(url => {
        postData.postImagePath = url;
        this.prepareData(postData);
        form.reset();
        this.router.navigate(['/posts']);
      });
    });
  };

  prepareData(postData: Post) {
    this.afs.collection('posts').add(postData).then(docRef => {
      this.toastr.success('Post inserted successfully.');

    }).catch(err => { console.log(err) });
  }

  loadData() {
    return this.afs.collection('posts').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, data };
        })
      })
    )
  }

  loadPost(id: string) {
    return this.afs.doc(`posts/${id}`).valueChanges();
  }

  updateData(id: string, data: Post, selectedImage: any) {
    const filePath = `postImage/${Date.now()}`;
    this.storage.upload(filePath, selectedImage).then(() => {
      console.log('Image uploaded successfully');
      this.storage.ref(filePath).getDownloadURL().subscribe(url => {
        data.postImagePath = url;
        this.afs.collection('posts').doc(id).update(data).then(docRef => {
          this.toastr.success('Post updated successfully.');
          this.router.navigate(['/posts']);
        }).catch(err => { console.log(err) });

        this.router.navigate(['/posts']);
      });
    });

  }


  deleteData(postImagePath: string, id: string) {
    this.storage.storage.refFromURL(postImagePath).delete().then(() => {
      this.afs.collection('posts').doc(id).delete().then(docRef => {
        this.toastr.success('Post deleted successfully.');

      }).catch(err => { console.log(err) });
    });
  }

  isFeatured(postId: string, data: any) {

    this.afs.collection('posts').doc(postId).update(data).then(docRef => {
      if (data.isFeatured) {
        this.toastr.success('Post marked as featured.');
      } else {
        this.toastr.success('Post marked as not featured');

      }
      this.router.navigate(['/posts']);
    }).catch(err => { console.log(err) });
  }
}
