import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MasterService } from '../services/master.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createinvoice',
  templateUrl: './createinvoice.component.html',
  styleUrls: ['./createinvoice.component.css']
})
export class CreateinvoiceComponent implements OnInit{
  
  pagetitle='Crear Invoice'
  datadetails!:FormArray<any>

  mastercustomers:any;
  masterproducts:any;

  productlist!:FormGroup<any>

  constructor(private builder:FormBuilder, private _service:MasterService, private router:Router) {
    
  }
  ngOnInit(): void {
    this.ObtenerCustomers();
    this.ObtenerProducts();
  }
  // jalara los datos que envia el formulario
  invoiceform=this.builder.group({
    invoiceno:this.builder.control('', Validators.required),
    customerId:this.builder.control('', Validators.required),
    customerName:this.builder.control(''),
    deliveryAddress:this.builder.control(''),
    remarks:this.builder.control(''),
    summaryTotal:this.builder.control({value:0, disabled:true}),
    tax:this.builder.control(0),
    netTotal:this.builder.control({value:0, disabled:true}),
    details:this.builder.array([])//array
  });
  //funcion boton save
  SaveInvoice(){
    console.log(this.invoiceform.value);
  }
  //funcion boton add tABLA pRODUCTS
  //obtener details del invoiceform y almacenar en datadetails
  //pushear lo obtenido en el generateRow
  AddProduct(){
    this.datadetails=this.invoiceform.get("details") as FormArray;
    this.datadetails.push(this.GenerateRow());
  }

  get invoiceproduct(){
    return this.invoiceform.get("details") as FormArray;
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

  // PARA LISTA DESPLEGABLES SELECTS
  ObtenerCustomers(){
    this._service.GetCustomers().subscribe(dat=>{
      this.mastercustomers=dat;    })
  }
  ObtenerProducts(){
    this._service.GetProducts().subscribe(dat=>{
      this.masterproducts=dat;    })
  }

  //Eventos Changes Lista desplegables trae los datos de API
  changecustomer(){
    let codecustomer=this.invoiceform.get("customerId")?.value;
    this._service.GetCustomerById(codecustomer).subscribe(data=>{
      let customerid:any;
      customerid=data;
      if(customerid!=null){
        this.invoiceform.get("deliveryAddress")?.setValue(customerid.address+","+customerid.phoneno+","+customerid.email)
      }
    }
    )
  }
  changeproduct(index:any){
    let productdetail=this.invoiceform.get("details") as FormArray;
    this.productlist=productdetail.at(index) as FormGroup;//trae del array detail del invoiceform, la posicion(index) y lo pasa en un formGroup
    let productCode=this.productlist.get("productCode")?.value;//de ese array obtenemo el productCode para jalar de la api de products
    this._service.GetProductsById(productCode).subscribe(data=>{//
      let prodid:any;
      console.log(data);
      prodid=data;
      if(prodid!=null){
        this.productlist.get("productName")?.setValue(prodid.name);
        this.productlist.get("salesPrice")?.setValue(prodid.price);
        this.calcularTotal(index)
      }
    })
  }
  //Calcula el total price*qty este change esta en el html de price y qty
  calcularTotal(index:any){
    let productdetail=this.invoiceform.get("details") as FormArray;
    this.productlist=productdetail.at(index) as FormGroup;
    let qty= this.productlist.get("qty")?.value;
    let price=this.productlist.get("salesPrice")?.value;
    let total=qty*price;
    this.productlist.get("total")?.setValue(total);
    this.calcularpreciototal();
  }

  //CALCULO DE LOS MONTOS TOTALES
  calcularpreciototal(){
    //getRaw obtiene el array de objetos de los product details
    let arrayproduct=this.invoiceform.getRawValue().details;
    let sumtotal=0;
    
    arrayproduct.forEach( (x:any) => {
      sumtotal=sumtotal+x.total;
    });
    let tax=(7/100)*sumtotal;

    this.invoiceform.get("summaryTotal")?.setValue(sumtotal);
    this.invoiceform.get("tax")?.setValue(tax);
    this.invoiceform.get("netTotal")?.setValue(sumtotal+tax);
    
  }
}
