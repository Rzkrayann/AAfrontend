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
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AssignmentsComponent,
    MatIconModule,
    MatButtonModule, MatToolbar,
    MatDrawerContainer, MatSidenavModule, RouterLink, MatSlideToggleModule, NgOptimizedImage
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'assignment-app';
  showFiller = false;

  constructor (private authService: AuthService, private router:Router, private assignmentsService: AssignmentsService) {}


  isAdmin():boolean{
    return this.authService.isAdmin();
  }

  isLogged():boolean{
    return this.authService.loggedIn;
  }

  generateData(){
    // create assignments with data.ts file
    // for each assignment, call addAssignment()
    assignments.forEach(assignment => {
      this.assignmentsService.addAssignment(assignment).subscribe(message => console.log(message));
      //wait for 20 seconds
      setTimeout(() => {
        window.location.reload();
      }, 20000);

    });

  }

}


