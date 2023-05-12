import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http:HttpClient) { }

  GetCustomers(){
    return this.http.get('https://localhost:7155/Customer')
  }
  GetCustomerById(code:any){
    return this.http.get('https://localhost:7155/Customer/GetCustomer?code='+code)
  }
  GetProducts(){
    return this.http.get('https://localhost:7155/GetProducts')
  }
  GetProductsById(code:any){
    return this.http.get('https://localhost:7155/GetProductId?code='+code)
  }
}
