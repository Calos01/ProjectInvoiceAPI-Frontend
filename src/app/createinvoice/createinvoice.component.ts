import { Component } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-createinvoice',
  templateUrl: './createinvoice.component.html',
  styleUrls: ['./createinvoice.component.css']
})
export class CreateinvoiceComponent{
  
  pagetitle='Crear Invoice'
  datadetails!:FormArray<any>

  constructor(private builder:FormBuilder) {
    
  }
  // jalara los datos que envia el formulario
  invoiceform=this.builder.group({
    invoiceno:this.builder.control('', Validators.required),
    customerId:this.builder.control('', Validators.required),
    customerName:this.builder.control(''),
    deliveryAddress:this.builder.control(''),
    remarks:this.builder.control(''),
    total:this.builder.control({value:0, disabled:true}),
    tax:this.builder.control(''),
    netTotal:this.builder.control({value:0, disabled:true}),
    details:this.builder.array([])//array
  });
  //funcion boton save
  SaveInvoice(){
    console.log(this.invoiceform.value);
  }
  //funcion boton add
  //obtener details del invoiceform y almacenar en datadetails
  //pushear lo obtenido en el generateRow
  AddProduct(){
    this.datadetails=this.invoiceform.get("details") as FormArray;
    this.datadetails.push(this.GenerateRow());
  }

  GenerateRow(){
    return this.builder.group({
      invoiceno:this.builder.control(''),
      productCode:this.builder.control('', Validators.required),
      productName:this.builder.control(''),
      qty:this.builder.control(1),
      salesPrice:this.builder.control(0),
      total:this.builder.control({value:0, disabled:true}),
    });
  }
}
