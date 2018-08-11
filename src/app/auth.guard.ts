import { Injectable } from '@angular/core';  
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';  
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()  
export class AuthGuardGuard implements CanActivate   
{  
  constructor(private router:Router, private auth: AuthService) {}  
canActivate(  next: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean  
     {  
        if(this.auth.isLoggednIn()){
          return true;
        }else{
          alert("Unauthorized Access,Redirecting to Home");  
          this.router.navigate(['home']);
          return false;
        }
     }  
}  