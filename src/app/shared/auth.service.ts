import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users = [
    { username: 'admin', password: 'admin', isAdmin: true },
    { username: 'user', password: 'user', isAdmin: false }
  ];

  currentUser : any = null;

  loggedIn = false;

  login(username : string, password : string):boolean {
    const user = this.users.find(user => user.username === username && user.password === password);
    if(user) {
      this.loggedIn = true;
      this.currentUser = user;
      return true;
    }
    return false;
  }

  logout() {
    this.loggedIn = false;
  }

  isAdmin() {
    if(!this.loggedIn) {
      return false;
    }
    else{
      return this.currentUser.isAdmin;
    }
  }
}
