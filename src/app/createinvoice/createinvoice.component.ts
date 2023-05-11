import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-createinvoice',
  templateUrl: './createinvoice.component.html',
  styleUrls: ['./createinvoice.component.css']
})
export class CreateinvoiceComponent{
  /**
   *
   */
  constructor(private builder:FormBuilder) {
    
  }
  invoiceform=this.builder.group({
    invoiceno:this.builder.control('', Validators.required),
    customerId:this.builder.control('', Validators.required),
    customerName:this.builder.control(''),
    deliveryAddress:this.builder.control(''),
    remarks:this.builder.control(''),
    total:this.builder.control(''),
    tax:this.builder.control(''),
    netTotal:this.builder.control('')
  });

  SaveInvoice(){
    
  }
}
