import {Component, Output, EventEmitter, OnInit} from '@angular/core';
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import {MatOption, provideNativeDateAdapter} from "@angular/material/core";
import { MatSelect } from "@angular/material/select";
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Assignment } from '../assignments/assignments.model';
import {FormsModule} from "@angular/forms";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {AssignmentsService} from "../shared/assignments.service";

@Component({
  selector: 'app-add-assignment',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatButton,
    RouterLink,
  ],
  templateUrl: './add-assignment.component.html',
  styleUrl: './add-assignment.component.css',
  providers: [provideNativeDateAdapter()],

})
export class AddAssignmentComponent implements OnInit{
  @Output() assignementAdded = new EventEmitter<Assignment>();
  name = "";
  date: any;

  constructor(private assignmentsService: AssignmentsService) { }

  ngOnInit(): void {}

  onSubmit(event: any) {
    event.preventDefault();
    console.log('Form submitted');
    console.log(event);
    const newAssignement: Assignment = {
      // random id not existing in the database
      id: Math.floor(Math.random() * 10000),
      name: this.name,
      date: this.date,
      isDone: false
    };
    console.log(newAssignement);
    this.assignmentsService.addAssignment(newAssignement).subscribe(message => console.log(message));
  }
}
