import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class CalcServiceService {
  private calcUrl: string;
  constructor(private http: HttpClient) {
    this.calcUrl = 'http://localhost:8080'
  }
   public getAnswerTwoOperand(operand1:String ,operator:string,operand2:string):Observable<String> {
      return this.http.get(this.calcUrl+'/'+operand1+'/'+operator+'/'+operand2 ,{responseType:'text'});
   }
   public getAnswerOneOperand(operator:string,operand2:string):Observable<String> {
    return this.http.get(this.calcUrl+'/'+operator+'/'+operand2,{responseType:'text'});
  }

}
