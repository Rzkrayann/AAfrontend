import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Assignment} from "../assignments.model";
import {DatePipe, NgIf} from "@angular/common";
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatButton} from "@angular/material/button";
import {AssignmentsService} from "../../shared/assignments.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {MatCheckbox, MatCheckboxChange} from "@angular/material/checkbox";
import {AuthService} from "../../shared/auth.service";

@Component({
  selector: 'app-assignment-detail',
  standalone: true,
    imports: [
        NgIf,
        MatChipsModule,
        MatCardModule,
        MatProgressBarModule,
        DatePipe,
        MatButton,
        RouterLink,
        MatCheckbox
    ],
  templateUrl: './assignment-detail.component.html',
  styleUrl: './assignment-detail.component.css'
})
export class AssignmentDetailComponent implements OnInit {
  /*@Input()*/ receivedAssignment!: Assignment | undefined;

  @Output() assignmentDeleted = new EventEmitter<Assignment>();

  constructor(private assignmentsService: AssignmentsService, private route : ActivatedRoute, private router:Router, private authService:AuthService)  {}
    ngOnInit()
  :
    void {
      this.getAssignment();
    }


  getAssignment() {
    const id = +this.route.snapshot.params['id'];
    this.assignmentsService.getAssignement(id).subscribe(assignment => this.receivedAssignment = assignment);
  }

  onDeleteAssignment() {
    console.log(this.receivedAssignment);
    this.assignmentsService.deleteAssignment(this.receivedAssignment).subscribe((message) => {
      console.log(message);
      this.router.navigate(['/home']);
    });

  }

  onCheckboxChange(assignement: Assignment, event: MatCheckboxChange) {
    this.assignmentsService.updateAssignment(assignement, event).subscribe(message => console.log(message));
  }

  onClickEdit(){
    this.router.navigate(["/assignment", this.receivedAssignment?.id, "edit"],
      {queryParams: {name: this.receivedAssignment?.name}, fragment:'editing'});
  }

  isAdmin():boolean{
    return this.authService.isAdmin();
  }

  isLogged():boolean{
    return this.authService.loggedIn;
  }
}
