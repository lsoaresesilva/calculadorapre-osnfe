import { Component, OnInit } from '@angular/core';
import { NotaFiscalEletronicaService } from "app/nota-fiscal-eletronica.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-costs',
  templateUrl: './costs.component.html',
  styleUrls: ['./costs.component.css']
})
export class CostsComponent implements OnInit {

  formCustos: FormGroup;

  constructor(public nfeService: NotaFiscalEletronicaService) {
    this.formCustos = new FormGroup({
      frete: new FormControl('0', Validators.required),
      fronteira: new FormControl('0', Validators.required),
      aliquotaSimples: new FormControl('0', Validators.required),
      taxaCartao: new FormControl('0', Validators.compose([Validators.required, Validators.minLength(8)])),
      comissaoVendedor: new FormControl('0', Validators.required),
      taxasAdicionais: new FormControl('0', Validators.required),
      valorAdicional: new FormControl('0', Validators.required),
      margemLucro: new FormControl('0', Validators.required),
      despesasFixas: new FormControl('0', Validators.required),
      margemContribuicao: new FormControl('50', Validators.required)
    });
  }

  ngOnInit() {
  }

  recalcularPrecos(){
    this.nfeService.redefinirCustos(this.formCustos);
  }

}
