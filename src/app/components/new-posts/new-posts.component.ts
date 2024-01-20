import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post';
import { FirestoreService } from 'src/app/services/firestore.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-new-posts',
  templateUrl: './new-posts.component.html',
  styleUrls: ['./new-posts.component.css']
})
export class NewPostsComponent {
  permalink: string = '';
  imgSrc: any;
  selectedImage: any;
  categories: Array<object> = []
  postForm: FormGroup
  postDataId: string = ''
  formStatus: string = 'Add New'

  constructor (private fs: FirestoreService, private fb: FormBuilder, private ps: PostService, private route: ActivatedRoute) {
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      permalink: ['', Validators.required],
      excerpt: ['', [Validators.required, Validators.minLength(50)]],
      category: ['', Validators.required],
      postImg: ['', Validators.required],
      content: ['', Validators.required]
    })
    this.route.queryParams.subscribe(val => {
    console.log(val)
      this.postDataId = val['id']
      if(this.postDataId){
        this.fs.getSinglePostData(this.postDataId).subscribe((post: any) => {
          console.log(post)
          this.postForm = this.fb.group({
            title: [post.title, [Validators.required, Validators.minLength(10)]],
            permalink: [post.permalink, Validators.required],
            excerpt: [post.excerpt, [Validators.required, Validators.minLength(50)]],
            category: [`${post.category.categoryId}-${post.category.category}`, Validators.required],
            postImg: ['', Validators.required],
            content: [post.content, Validators.required]
          })
          this.imgSrc = post.postImgPath
          this.formStatus = 'Edit'
        })
      }else{
        this.postForm = this.fb.group({
          title: ['', [Validators.required, Validators.minLength(10)]],
          permalink: ['', Validators.required],
          excerpt: ['', [Validators.required, Validators.minLength(50)]],
          category: ['', Validators.required],
          postImg: ['', Validators.required],
          content: ['', Validators.required]
        })
      }
    })
  }

  ngOnInit(): void {
    this.fs.getCategoryData().subscribe(value => {
      this.categories = value
    })
  }

  get fc() {
    return this.postForm.controls;
  }

  onTitleChange(event: any){
    this.permalink = event.target.value.replace(/\s/g, "-")
  }

  showPreviewImages(event: any){
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imgSrc = e.target?.result
    }

    reader.readAsDataURL(event.target.files[0])
    this.selectedImage = event.target.files[0]

  }

  onSubmit(){
    const postData: Post = {
      title: this.postForm.value.title,
      permalink: this.postForm.value.permalink,
      category: {
        categoryId: this.postForm.value.category.split('-')[0],
        category: this.postForm.value.category.split('-')[1]
      },
      excerpt: this.postForm.value.excerpt,
      postImgPath: "",
      content: this.postForm.value.content,
      isFeatured: false,
      views: 0,
      status: "new",
      createdAt: new Date()
    }

    this.ps.uploadImage(this.selectedImage, postData, this.formStatus, this.postDataId)
    this.postForm.reset()
    this.imgSrc = ''
  }

}
