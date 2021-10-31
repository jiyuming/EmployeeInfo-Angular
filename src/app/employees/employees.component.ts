import { Component, OnInit } from '@angular/core';
import { Employee } from '../data/employee';
import { EmployeeService } from '../data/employee.service';
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

  constructor(private employeeService: EmployeeService, private router: Router) { }

  ngOnInit() {
    this.sub = this.getEmployeesSub();
  }

  getEmployeesSub(): any {
    try {
      return this.employeeService.getEmployees().subscribe(e => {
        this.employees = e;
        this.filteredEmployees = e;
      })
    } catch (error) {
      console.log(error);
      this.loadingError = true;
    }
  }

  ngOnDestroy() {
    if (this.sub != undefined) this.sub.unsubscribe();
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
