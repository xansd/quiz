import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {
    
  private subject = new Subject<void>();
  sharedData = this.subject.asObservable();

  constructor() { }

  setData(data: any){
    this.subject.next(data);
  }

  getData(): Observable<any>{
    return this.subject.asObservable();
  }

  clearData() {
    this.subject.next();
  }

}
