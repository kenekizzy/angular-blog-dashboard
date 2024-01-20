import { Component, OnInit } from '@angular/core';
import { Login } from 'src/app/models/login';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fs: FirestoreService){}

  ngOnInit(){

  }

  onSubmit(form: Login){
   this.fs.loginAdmin(form.email, form.password)
  }

}
