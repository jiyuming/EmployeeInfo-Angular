import { Component, OnInit, OnDestroy } from '@angular/core';
import { EmployeeService } from '../data/employee.service';
import { Employee } from '../data/employee';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employees: Employee[];
  sub: any;
  loadingError: boolean = false;
  filteredEmployees: Employee[];

  constructor(private e: EmployeeService, private router: Router) { }

  ngOnInit() {
    this.sub = this.getEmployeesSub();
  }

  getEmployeesSub(): any {
    try {
      return this.e.getEmployees().subscribe(employees => {
        this.employees = employees;
        this.filteredEmployees = employees;
      });
    } catch (error) {
      console.log(error);
      this.loadingError = true;
    }
  }

  ngOnDestroy() {
    if (this.sub != undefined) {
      this.sub.unsubscribe();
    }
  }

  routeEmployee(id: string) {
    this.router.navigate(['/employee', id]);
  }

  onEmployeeSearchKeyUP(event) {
    let filter = event.target.value.toLowerCase();
    this.filteredEmployees = this.employees.filter(e => {
      return e.FirstName.toLowerCase().includes(filter)
        || e.LastName.toLowerCase().includes(filter)
        || e.Position.PositionName.toLowerCase().includes(filter);
    });
  }
}
