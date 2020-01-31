import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
import { Employee} from './employee';
import { EmployeeRaw} from './employee-raw';

@Injectable()
export class EmployeeService {

  private url = "https://rocky-retreat-80791.herokuapp.com";

  constructor(private http:HttpClient) { }

  getEmployees(): Observable<Employee[]>{
    return this.http.get<Employee[]>(`${this.url}/employees`);
  }

  saveEmployee(employee: EmployeeRaw): Observable<any>{
    return this.http.put<any>(this.url + "/employee/" + employee._id, employee);
  }

  getEmployee(id): Observable<EmployeeRaw[]>{
    return this.http.get<EmployeeRaw[]>(this.url + "/employee-raw/" + id);
  }
}
