import { Component, OnInit } from '@angular/core';
import { NotaFiscalEletronicaService } from "app/nota-fiscal-eletronica.service";

@Component({
  selector: 'app-contribution-margin',
  templateUrl: './contribution-margin.component.html',
  styleUrls: ['./contribution-margin.component.css']
})
export class ContributionMarginComponent implements OnInit {

  margemContribuicao;

  constructor(public nfeService:NotaFiscalEletronicaService) { 
    this.margemContribuicao = 50;
  }

  ngOnInit() {
  }

  redefinirMargemContribuicao(){
    this.nfeService.redefinirMargemContribuicao(this.margemContribuicao);
  }

}
