import { Component, OnInit } from '@angular/core';
import { EmployeeRaw } from '../data/employee-raw';
import { Position} from '../data/position';
import { EmployeeService} from "../data/employee.service";
import { ActivatedRoute} from '@angular/router';
import { PositionService } from '../data/position.service';
import { NgForm}  from '@angular/forms';

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

  constructor(private e: EmployeeService, private p: PositionService, private r: ActivatedRoute) { }

  ngOnInit() {

 /*   Determine what the value of the _id variable is in the Route parameter using the ActivatedRoute service
      (Note: a reference to the subscription should be stored using "paramSubscription" so that it can be
      disposed of later)
*/
    this.paramSubscription = this.r.params.subscribe( param => {

  //    Use the value of _id to populate the "employee" property using the EmployeeService service (Note: a
  //      reference to the subscription should be stored using "employeeSubscription" so that it can be disposed
  //      of later)

      this.employeeSubscription = this.e.getEmployee(param['_id']).subscribe(data => {
        this.employee = data[0];
      });

      this.getPositionsSubcription = this.p.getPositions().subscribe( data => {
        this.positions = data;
      });

    })
  }

  onSubmit(f: NgForm){

  //  Persist ("save") the "employee" property using the EmployeeService service (Note: a reference to the
  //    subscription should be stored using "saveEmployeeSubscription"
    this.saveEmployeeSubscription = this.e.saveEmployee(this.employee)
    // If the subscription output the data successfully
    .subscribe( () =>{
      this.successMessage = true;

    //  Using the setTimeout() method, automatically set the successMessage property to false after
    //  2500 ms
      setTimeout( () => {
        this.successMessage = false;
      }, 2500);
    },

    // If the subscription failed to output the data
    () => {
      this.failMessage = true;
      setTimeout( () => {
        this.failMessage = false;
      }, 2500);
    });
  }

//  In this method we call the "unsubscribe()" methods on any saved subscriptions within the component (ie:
//    paramSubscription, etc) - Note: we must make sure they are not "undefined" before we call "unsubscribe()"  
  ngOnDestroy(){
    if(this.paramSubscription){
      this.paramSubscription.unsubscribe();
    }

    if(this.employeeSubscription){
      this.employeeSubscription.unsubscribe();
    }

    if(this.getPositionsSubcription){
      this.getPositionsSubcription.unsubscribe();
    }

    if(this.saveEmployeeSubscription){
      this.saveEmployeeSubscription.unsubscribe();
    }
  }
}
