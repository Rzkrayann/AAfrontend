import { Component } from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import { AssignmentsComponent } from "./assignments/assignments.component";
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbar} from "@angular/material/toolbar";
import {MatDrawerContainer} from "@angular/material/sidenav";
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {AuthService} from "./shared/auth.service";
import {AssignmentsService} from "./shared/assignments.service";
import {assignments} from "./shared/data";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AssignmentsComponent,
    MatIconModule,
    MatButtonModule, MatToolbar,
    MatDrawerContainer, MatSidenavModule, RouterLink, MatSlideToggleModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'assignment-app';
  showFiller = false;

  constructor (private authService: AuthService, private router:Router, private assignmentsService: AssignmentsService) {}
  // login() {
  //   if(!this.authService.loggedIn) {
  //     this.authService.login();
  //   }else {
  //     this.authService.logout();
  //     this.router.navigate(['/home']);
  //   }
  // }

  isAdmin():boolean{
    return this.authService.isAdmin();
  }

  isLogged():boolean{
    return this.authService.loggedIn;
  }

  generateData(){
    // create assignments with data.ts file
    // read data.ts
    // for each assignment, call addAssignment()
    assignments.forEach(assignment => {
      this.assignmentsService.addAssignment(assignment).subscribe(message => console.log(message));
      //wait for 1 second
      setTimeout(() => {
        window.location.reload();
      }, 20000);

    });

  }

}


