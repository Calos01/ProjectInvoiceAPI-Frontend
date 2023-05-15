import { Component, OnInit } from '@angular/core';
import { MasterService } from '../services/master.service';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
  invoiceHeader: any;
  constructor(private _service:MasterService, private advise:ToastrService) {
    
  }
  ngOnInit(): void {
    this.CargarInvoices();
  }

  CargarInvoices(){
    this._service.GetAllInvoice().subscribe(data=>{
      this.invoiceHeader=data;
      console.log(this.invoiceHeader);
    })
  }

  EliminarInvoice(code:any){
    this._service.DeleteInvoice(code).subscribe(data=>{
      this.advise.warning("Se ha eliminiado el codigo");
      console.log(data);
      this.CargarInvoices();
    })
  }

}
