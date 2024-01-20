import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  adminUserData: any = {} 
  isLoggedIn$!: Observable<boolean>;

  constructor(private fs: FirestoreService){}

  ngOnInit(): void {
    this.adminUserData = localStorage.getItem('user')
    this.adminUserData = JSON.parse(this.adminUserData)
    this.isLoggedIn$ = this.fs.isLoggedIn()
  }

  logAdminOut(){
    this.fs.logoutAdminUser()
  }

}
