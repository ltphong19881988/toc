import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthService, public router : Router, private storage: Storage ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Promise<boolean> {

    return new Promise((resolve, reject) => {
      var auth = this.auth;
      Promise.all([auth.checkToken(this.storage)]).then(values => {
        // console.log('auth status', values);
        // console.log('auth status', auth.isAuthenticated());
        if (!auth.isAuthenticated()) {
          this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }} );
          resolve (false);
        }else{
          resolve (true);
        }
      })
    })

    
  }
  
}
