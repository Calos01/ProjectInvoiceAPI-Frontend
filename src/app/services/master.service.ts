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
  
  //Invoices
  GetAllInvoice(){
    return this.http.get('https://localhost:7155/Invoice/GetInvoices')
  }
  GetInvoiceById(invoiceno:any){
    return this.http.get('https://localhost:7155/Invoice/GetInvoiceId?invoiceno='+invoiceno)
  }
  GetInvoiceDetails(invoiceno:any){
    return this.http.get('https://localhost:7155/Invoice/GetListDetails?invoceno='+invoiceno)
  }
  DeleteInvoice(invoiceno:any){
    return this.http.delete('https://localhost:7155/Invoice/DeleteInvoice?invoiceno='+invoiceno)
  }
  SaveInvoice(datainvoice:any){
    return this.http.post('https://localhost:7155/Invoice/SaveInvoice',datainvoice)
  }
}
