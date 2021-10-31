import { Component, OnInit, OnDestroy } from '@angular/core';
import { Employee } from '../data/employee';
import { EmployeeService } from '../data/employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employees: Employee[];
  sub: any;
  loadingError: boolean = false;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.sub = this.getEmployeesSub();
  }

  getEmployeesSub(): any {
    try {
      return this.employeeService.getEmployees().subscribe(e => {
        this.employees = e;
      })
    } catch (error) {
      console.log(error);
      this.loadingError = true;
    }
  }

  ngOnDestroy() {
    if (this.sub != undefined) this.sub.unsubscribe();
  }
}
