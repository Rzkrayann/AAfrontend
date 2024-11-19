import {Component, signal} from '@angular/core';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatButton, MatIconButton} from "@angular/material/button";
import {FormsModule} from "@angular/forms";
import {AuthService} from "../shared/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-logging',
  standalone: true,
  imports: [
    MatFormField,
    MatIcon,
    MatLabel,
    MatInput,
    MatIconButton,
    FormsModule,
    MatButton,
  ],
  templateUrl: './logging.component.html',
  styleUrl: './logging.component.css'
})
export class LoggingComponent {
  constructor (private authService: AuthService, private router:Router) {}
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  password = "";
  username = "";


  login() {
    console.log(this.username);
    let logBool;
    if (!this.authService.loggedIn) {
      logBool = this.authService.login(this.username, this.password);
      if (logBool) {
        this.router.navigate(['/home']);
      }
      else{
        console.log("Login failed");
        alert("Login failed");
      }
    } else {
      this.authService.logout();
      this.router.navigate(['/home']);
    }
  }

  isLogged():boolean{
    return this.authService.loggedIn;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

}
