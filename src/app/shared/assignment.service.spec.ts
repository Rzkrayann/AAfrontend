import { TestBed } from '@angular/core/testing';

import { AssignmentsService } from './assignments.service';

describe('AssignmentService', () => {
  let service: AssignmentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssignmentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
