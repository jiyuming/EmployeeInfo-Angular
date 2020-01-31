import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";

import { Observable } from "rxjs";
import { Position } from './position';

@Injectable()
export class PositionService {
    
  private url = "https://rocky-retreat-80791.herokuapp.com";

  constructor(private http:HttpClient) { }

  getPositions(): Observable <Position[]>{
    return this.http.get<Position[]>(`${this.url}/positions`);
  }

  savePosition(position: Position): Observable<any>{
    return this.http.put<any>(this.url + "/position/" + position._id, position);
  }

  getPosition(id): Observable<Position[]>{
    return this.http.get<Position[]>(this.url + "/position/" + id);
  }
}