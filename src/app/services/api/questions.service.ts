import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  private API_URI = "https://aq6009.gways.org/prueba-front";

  constructor(private http: HttpClient) { }

  getQuestions(): Observable<any> {
    return this.http.get(`${this.API_URI}/get`);
  }

}
