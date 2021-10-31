import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Position } from './position';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private url = 'https://teams-api-21679.herokuapp.com';
  constructor(private http: HttpClient) { }

  getEmployees(){
    return this.http.get<Employee[]>(`${this.url}/employees`);
  }
}
