import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class SubscribersService {

  constructor(private fireStore: AngularFirestore, private toast: ToastrService) { }

  getSubscribersData(){
    return this.fireStore.collection("subscribers").snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data()
          const id = a.payload.doc.id
          return {id, data}
        })
      })
    )
  }

  deleteSelectedSubscriber(subId: string){
    this.fireStore.collection("subscribers").doc(subId).delete().then(docRef => {
      this.toast.error("Subscriber Deleted Successfully", "Success")
    }).catch(err => {
      console.log(err)
    })
  }
}

