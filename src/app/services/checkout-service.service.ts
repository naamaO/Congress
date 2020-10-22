import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckoutServiceService {
  public dict: Record<string, string> = {};
  //for testing:
  private _counter = 0;

  public get(key: string): string {
    return this.dict[key];
  }
  public put(key: string, value: string) {
    this.dict[key] = value;
  }
  constructor() {
    console.log(`this is the ${this._counter++} CheckoutService`);
  }
}
