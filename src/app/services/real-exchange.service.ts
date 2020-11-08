import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RealExchangeService {

  realExchangeApi: string = `https://api.exchangeratesapi.io/latest?base=USD`;

  public _realExchangeValues: any={
    "rates":{ "ILS":3.4156554435}
  };

  constructor(private http: HttpClient) { }

  public getExchangeValues() {
    this.http.get(this.realExchangeApi).pipe(map((r: Response) => r)
    ).subscribe(result => {
      this._realExchangeValues = result;
      console.log(result);
    });
  }

  public convertILS_USD(amount:number){
    if(!amount){
      return 0;
    }
    return Math.round(amount/this._realExchangeValues.rates['ILS'] * 100) / 100;
    
  }

  public convertUSD_ILS(amount:number){
    if(!amount){
      return 0;
    }
   return Math.round(amount*this._realExchangeValues.rates['ILS'] * 100) / 100;
  }


}
