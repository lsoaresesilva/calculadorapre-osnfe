import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NotaFiscalEletronicaService } from "app/nota-fiscal-eletronica.service";

@Component({
  selector: 'app-product-upload',
  templateUrl: './product-upload.component.html',
  styleUrls: ['./product-upload.component.css']
})
export class ProductUploadComponent implements OnInit {

  constructor(private router:Router, public nfeService:NotaFiscalEletronicaService) { }

  ngOnInit() {
  }

  openUpload(type:string){
    if(type == "manual"){
      this.router.navigate(['manual-upload'])
    }else{
      this.router.navigate(['nfe-upload'])
    }

  }

  setAgreement(event) {
    this.nfeService.setAgreement(event.target.checked);
  }

}
