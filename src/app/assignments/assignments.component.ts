import {Component, OnInit} from '@angular/core';
import {Assignment} from "./assignments.model";
import {MatListModule} from '@angular/material/list';
import {MatButton} from '@angular/material/button';
import {NotDoneDirective} from '../shared/notDone.directive';
import {DoneDirective} from '../shared/done.directive';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {AddAssignmentComponent} from "../add-assignment/add-assignment.component";
import {DatePipe, NgIf} from "@angular/common";
import {MatCheckbox, MatCheckboxChange} from "@angular/material/checkbox";
import {AssignmentDetailComponent} from "./assignment-detail/assignment-detail.component";
import {AssignmentsService} from "../shared/assignments.service";
import {RouterLink, RouterOutlet} from "@angular/router";
import {AuthService} from "../shared/auth.service";
import {MatPaginatorModule, PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-assignments',
  standalone: true,
  imports: [MatListModule, MatButton, NotDoneDirective, DoneDirective, MatSelectModule, MatInputModule, MatFormFieldModule, AddAssignmentComponent, NgIf, MatCheckbox, DatePipe, AssignmentDetailComponent, RouterLink, RouterOutlet, MatPaginatorModule],
  templateUrl: './assignments.component.html',
  styleUrl: './assignments.component.css'
})
export class AssignmentsComponent implements OnInit {
  title = 'Welcome to the Online Homeworks System';
  formVisible = false;
  assignmentClicked !: Assignment;
  assignements !: Assignment[];

  //manage pagination
  page:number = 1;
  limit:number = 10;
  totalDocs!: number;
  totalPages!: number;
  nextPage!: number;
  prevPage!: number;
  hasPrevPage!: boolean;
  hasNextPage!: boolean;




  constructor(private assignmentsService: AssignmentsService, private authService:AuthService) { }
    ngOnInit(): void {
    //this.assignmentsService.getAssignments().subscribe(assignements => this.assignements = assignements);
    this.assignmentsService.getAssignmentsPagine(this.page, this.limit).subscribe(data => {
      this.assignements = data.docs;
      this.totalDocs = data.totalDocs;
      this.totalPages = data.totalPages;
      this.nextPage = data.nextPage;
      this.prevPage = data.prevPage;
      this.hasPrevPage = data.hasPrevPage;
      this.hasNextPage = data.hasNextPage;
      console.log("Data received");
    });
  }



  onAddAssignement() {
   console.log("Btn clicked");

   //this.formVisible = true;
  }
  //
  // onAssignementAdded(newAssignement: Assignment) {
  //   //this.assignements.push(newAssignement);
  //   this.assignmentsService.addAssignment(newAssignement).subscribe(message => console.log(message));
  //   this.formVisible = false;
  // }

  onCheckboxChange(assignement: Assignment, event: MatCheckboxChange) {
    this.assignmentsService.updateAssignment(assignement,event).subscribe(message => console.log(message));
  }

  onClickAssignment(assignement: Assignment) {
    this.assignmentClicked = assignement;
  }

  isAdmin():boolean{
    return this.authService.isAdmin();
  }

  getAssignments(): void {
    this.assignmentsService.getAssignmentsPagine(this.page, this.limit).subscribe(data => {
      this.assignements = data.docs;
      this.totalDocs = data.totalDocs;
      this.totalPages = data.totalPages;
      this.nextPage = data.nextPage;
      this.prevPage = data.prevPage;
      this.hasPrevPage = data.hasPrevPage;
      this.hasNextPage = data.hasNextPage;
      console.log("Data received");
    });
  }

  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.getAssignments();
  }
}
