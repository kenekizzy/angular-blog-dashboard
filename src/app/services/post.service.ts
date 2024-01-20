import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Post } from '../models/post';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(public fireStorage: AngularFireStorage, public fs: FirestoreService) { }

  uploadImage(selectedImage: any, postData: Post, formStatus: string, id?: string){
    const imgPath = `postImg/${Date.now()}`

    this.fireStorage.upload(imgPath, selectedImage).then(() => {
      this.fireStorage.ref(imgPath).getDownloadURL().subscribe(url => {
        postData.postImgPath = url
        if(formStatus == 'Edit'){
          this.fs.updatePostData(id, postData)
        }else{
          this.fs.savePost(postData)
        }
      })
    })
  }

  deleteImage(postImgPath: string, id: string){
    this.fireStorage.storage.refFromURL(postImgPath).delete().then(() => {
      this.fs.deletePostData(id)
    })
  }
}
