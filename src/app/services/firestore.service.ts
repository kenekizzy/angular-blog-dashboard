import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { Categories } from '../models/categories';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, map } from 'rxjs';
import { Post } from '../models/post';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  loggedInGuard: boolean = false

  constructor(private fs: AngularFirestore, private fa: AngularFireAuth, private toast: ToastrService, private router: Router ) { }

  saveData(categoriesData: Categories){
    this.fs.collection("categories").add(categoriesData).then(docRef => {
      this.toast.success("Category Added Successfully", "Success", {
        timeOut: 1000,
      })
    }).catch(err => {
      console.log(err)
    })
  }

  getCategoryData(){
    return this.fs.collection("categories").snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data()
          const id = a.payload.doc.id
          return {id, data}
        })
      })
    )
  }

  updateCategoryData(id: any, data: Categories){
    this.fs.collection("categories").doc(id).update(data).then(docRef => {
      this.toast.success("Category Updated Successfully", "Success")
    }).catch(err => {
      console.log(err)
    })
  }

  deleteCategoryData(id: any){
    this.fs.collection("categories").doc(id).delete().then(docRef => {
      this.toast.error("Category Deleted Successfully", "Success")
    }).catch(err => {
      console.log(err)
    })
  }

  savePost(postData: Post){
    this.fs.collection("posts").add(postData).then(docRef => {
      this.toast.success("Post Added Successfully", "Success", {
        timeOut: 1000,
      })
      this.router.navigate(['/posts'])
    })
  }

  getPostData(){
    return this.fs.collection("posts").snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data()
          const id = a.payload.doc.id
          return {id, data}
        })
      })
    )
  }

  getSinglePostData(id: any){
    return this.fs.collection("posts").doc(id).valueChanges()
  }

  updatePostData(id: any, data: Post){
    this.fs.collection('posts').doc(id).update(data).then(docRef => {
      this.toast.success("Post Updated Successfully", "Success", {
        timeOut: 1000
      })
      this.router.navigate(['/posts'])
    })
  }

  deletePostData(id: string){
    this.fs.collection('posts').doc(id).delete().then(docRef => {
      this.toast.success('Post Deleted Successfully', 'Success')
    }).catch(err => {
      console.log(err)
    })
  }

  updateFeaturedData(id: string, featureData: object){
    this.fs.collection('posts').doc(id).update(featureData).then(docRef => {
      this.toast.info("Featured Updated Successfully", "Success")
    }).catch(err => {
      console.log(err)
    })
  }

  loginAdmin(email: string, password: string){
    this.fa.signInWithEmailAndPassword(email, password).then(logRef => {
      this.toast.success("Logged In Successfully", "Success")
      this.loadAdminUser()
      this.loggedIn.next(true)
      this.loggedInGuard = true
      this.router.navigate(['/'])
    }).catch(err => {
      console.log(err)
      this.toast.error("Invalid Admin Details", "Error")
    })
  }

  loadAdminUser(){
    this.fa.authState.subscribe(user => {
       localStorage.setItem("user", JSON.stringify(user))
    })
  }

  logoutAdminUser(){
    this.fa.signOut().then(logRef => {
      this.toast.success("User Logged Out", "Success")
      this.loggedIn.next(false)
      this.loggedInGuard = false
      this.router.navigate(['/login'])
      localStorage.removeItem('user')
    }).catch(err => {
      console.log(err)
    })
  }

  isLoggedIn(){
    return this.loggedIn.asObservable()
  }
}
