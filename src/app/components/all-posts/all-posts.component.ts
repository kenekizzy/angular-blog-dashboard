import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']
})
export class AllPostsComponent {

  postDataArray: Array<object> = [];


  constructor (private fs: FirestoreService, private ps: PostService) {}

  ngOnInit() {
    this.fs.getPostData().subscribe(val => {
      this.postDataArray = val
    })
  }

  deletePostData(postImgPath: string, id: string){
    this.ps.deleteImage(postImgPath, id)
  }

  featureData(id: string, value: boolean){
    const featuredData = {
      isFeatured: value
    }

    this.fs.updateFeaturedData(id, featuredData)
  }
  
}
