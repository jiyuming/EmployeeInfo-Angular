import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import { Observable } from "rxjs";
import { Position } from './position';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  private url = 'https://teams-api-21679.herokuapp.com';
  constructor(private http: HttpClient) { }

  getPositions(){
    return this.http.get<Position[]>(`${this.url}/positions`);
  }
}
