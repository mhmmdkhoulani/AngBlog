import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { increment } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private afs: AngularFirestore) { }

  loadFeaturedPosts() {
    return this.afs.collection('posts', ref => ref.where('isFeatured', '==', true).limit(4)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, data };
        })
      })
    )
  }

  loadLatestPosts() {
    return this.afs.collection('posts', ref => ref.orderBy("createdAt")).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, data };
        })
      })
    )
  }

  loadPostsByCategory(categoryId: string) {
    return this.afs.collection('posts', ref => ref.where('category.id', '==', categoryId)).snapshotChanges().pipe(
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

  loadSimilarPosts(categoryId: string) {
    return this.afs.collection('posts', ref => ref.where('category.id', '==', categoryId)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, data };
        })
      })
    )
  }

  countViews(id: string) {
    const countViews = {
      views: increment(1)
    }
    this.afs.doc(`posts/${id}`).update(countViews).then(ref => {
      console.log("Views incremented")
    })
  }
}
