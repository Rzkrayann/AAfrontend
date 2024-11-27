import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignments.model';
import {Observable, of} from "rxjs";
import {MatCheckboxChange} from "@angular/material/checkbox";
import {LoggingService} from "./logging.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  assignements: Assignment[] = [
    {
      id: 1,
      name: "Angular work of M.Buffa",
      date: new Date('2024-10-15'),
      isDone: true
    },
    {
      id: 2,
      name: "RStudio work of M.Buffa",
      date: new Date('2024-10-15'),
      isDone: false
    },

  ];

  backEndUrl = 'https://aabackend.onrender.com/api/assignments';

  constructor(private loggingService:LoggingService, private http: HttpClient) { }

  // getAssignments(): Observable<Assignment[]> {
  //   return of(this.assignements);
  // }

  getAssignments(): Observable<Assignment[]> {
    return this.http.get<Assignment[]>(this.backEndUrl);
  }

  // getAssignement(id:number): Observable<Assignment | undefined> {
  //   const a:Assignment | undefined = this.assignements.find(
  //     a=> a.id === id);
  //   return of(a);
  // }

  getAssignement(id:number): Observable<Assignment | undefined> {
    return this.http.get<Assignment>(`${this.backEndUrl}/${id}`);
  }



  // addAssignment(assignment: Assignment): Observable<string> {
  //   this.assignements.push(assignment);
  //   this.loggingService.log(assignment.name, 'added');
  //   return of('Assignment added');
  // }

  addAssignment(assignment: Assignment): Observable<Assignment> {
    // verify if the id already exists in the database
    // if it exists, generate a new id
    let id2 =undefined;
    if (assignment.id) {
      this.http.get<Assignment>(`${this.backEndUrl}/${assignment.id}`).subscribe(
        (a) => {
          //console.log(a);
          id2 = a;
          if (id2 === null){
            console.log('id not found');
          }
          else{
            while (a.id === assignment.id) {
              assignment.id = Math.floor(Math.random() * 10000);
            }
          }

        }
      );
      //console.log(id2);
    }
    assignment.id = Math.floor(Math.random() * 10000);
    return this.http.post<Assignment>(this.backEndUrl, assignment);
  }

  updateAssignment(assignment: Assignment, event:MatCheckboxChange): Observable<string> {
    assignment.isDone = event.checked;
    // return of('Assignment updated');
    return this.http.put<string>(this.backEndUrl, assignment);
  }

  editAssignment(assignment: Assignment | undefined): Observable<Assignment> {
    return this.http.put<Assignment>(this.backEndUrl, assignment);
  }

  // deleteAssignment(assignment: Assignment | undefined): Observable<string> {
  //   // if (assignment instanceof Assignment) {
  //   //   // let pos = this.assignements.indexOf(assignment);
  //   //   const pos = this.assignements.findIndex(a => a.id === assignment.id);
  //   //   this.assignements.splice(pos, 1);
  //   // }
  //   if (assignment) {
  //     const pos = this.assignements.findIndex(a => a.id === assignment.id);
  //     if (pos > -1) {
  //       this.assignements.splice(pos, 1);
  //     }
  //   }
  //   // console.log(this.assignements[0]);
  //   return of('Assignment deleted !!');
  // }

  deleteAssignment(assignment: Assignment | undefined): Observable<Assignment> {
    console.log('deleteAssignment');
    console.log(assignment?.id);
    console.log(`${this.backEndUrl}/${assignment?.id}`);
    let id = assignment?.id;
    return this.http.delete<Assignment>(`${this.backEndUrl}/${id}`);
  }

  getAssignmentsPagine(page:number, limit:number): Observable<any> {
    return this.http.get<any>(`${this.backEndUrl}?page=${page}&limit=${limit}`);
  }


}
