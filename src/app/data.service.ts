import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  

  getExchangeData(code:string):Observable<any>{
    var apiURL = 'https://api.exchangeratesapi.io/latest?base=';
    console.log(code);
    apiURL = apiURL.concat(code);

    console.log(apiURL);

    return this.http.get<any>(apiURL);
  }
}
