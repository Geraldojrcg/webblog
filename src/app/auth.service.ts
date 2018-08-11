import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loged = false;
  constructor(private route : Router) { }
  login(){
    this.loged = true;
  }
  isLoggednIn() {
    return this.loged !== false;
  }
  logout() {
    this.loged = false;
    this.route.navigate(["home"]);
  }
}
