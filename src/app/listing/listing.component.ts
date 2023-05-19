import { Component, OnInit } from '@angular/core';
import { MasterService } from '../services/master.service';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
  invoiceHeader: any;
  constructor(private _service:MasterService, private advise:ToastrService, private router:Router) {
    
  }
  ngOnInit(): void {
    this.CargarInvoices();
  }

  CargarInvoices(){
    this._service.GetAllInvoice().subscribe(data=>{
      this.invoiceHeader=data;
    })
  }

  EditInvoice(invoiceno:any){
    this.router.navigateByUrl('editinvoice/'+invoiceno)
  }

  EliminarInvoice(code:any){
    if(confirm("Desea eliminar el Invoice: "+code)){
      this._service.DeleteInvoice(code).subscribe(data=>{
        let res: any;
        res=data;
        if(res.respuesta=="Paso"){
          this.advise.warning("Se ha eliminiado el codigo: "+code);
          console.log(data);
          this.CargarInvoices();
        }else{
          this.advise.error("No se pudo borrar")
        }
      })
    }
  }

}
