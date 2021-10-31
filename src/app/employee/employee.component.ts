import { Component, OnInit } from '@angular/core';
import { EmployeeRaw } from '../data/employeeRaw';
import { Position } from '../data/position';
import { EmployeeService } from "../data/employee.service";
import { ActivatedRoute } from '@angular/router';
import { PositionService } from '../data/position.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  paramSubscription: any;
  employeeSubscription: any;
  getPositionsSubcription: any;
  saveEmployeeSubscription: any;
  employee: EmployeeRaw;
  positions: Position[];
  successMessage = false;
  failMessage = false;

  constructor(private employeeService: EmployeeService, private positionService: PositionService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    // Determine what the value of the _id variable is in the Route parameter
    // a reference to the subscription will be disposed of later
    this.paramSubscription = this.activatedRoute.params.subscribe(param => {

      // use '_id' of employee to populate the "employee" property
      //  reference to the subscription will be disposed later
      this.employeeSubscription = this.employeeService.getEmployee(param['_id']).subscribe(data => {
        this.employee = data[0];
      });

      // populate the "positions" property 
      this.getPositionsSubcription = this.positionService.getPositions().subscribe(data => {
        this.positions = data;
      });
    });
  }

  onSubmit() {
    // save the "employee" property
    this.saveEmployeeSubscription = this.employeeService.saveEmployee(this.employee)
      .subscribe(() => {
        this.successMessage = true;
        setTimeout(() => { this.successMessage = false }, 2500);
      },
        () => {
          this.failMessage = true;
          setTimeout(() => {
            this.failMessage = false;
          }, 2500)
        }
      )
  }

  // check not undefined, then call unsubscribe()
  ngOnDestroy() {
    if (this.paramSubscription) {
      this.paramSubscription.unsubscribe();
    }

    if (this.employeeSubscription) {
      this.employeeSubscription.unsubscribe();
    }

    if (this.getPositionsSubcription) {
      this.getPositionsSubcription.unsubscribe();
    }

    if (this.saveEmployeeSubscription) {
      this.saveEmployeeSubscription.unsubscribe();
    }
  }
}
