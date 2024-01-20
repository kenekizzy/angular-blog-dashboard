import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { FirestoreService } from './firestore.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private fs: FirestoreService, private router: Router, private toast: ToastrService,){}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      if(this.fs.loggedInGuard){
        return true
      }else{
        this.router.navigate(['/login'])
        this.toast.info("You don't have permissions to this page", "Error")
        return false
      }
  }
  
}
