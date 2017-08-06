import { Injectable } from '@angular/core';
import { Produto } from "app/models/produto";
import { NFE } from "app/models/nfe";
import { Calculadora } from "app/models/calculadora";

@Injectable()
export class NotaFiscalEletronicaService {

  produtos: Array<Produto>;
  nfe: NFE;
  agreement: boolean;

  // TODO: change it from here.
  emptyDanfeMessage: string = "Primeiro você precisa importar o XML (DANFE) da sua nota fiscal eletrônica.";
  agreementMessage: string = "É preciso aceitar os termos de uso deste serviço antes de prosseguir."

  constructor() {
    this.produtos = [];
    this.nfe = new NFE();
    this.agreement = false;
  }

  setAgreement(checked) {
    this.agreement = checked;

  }

  calcularValorVenda(){
    for (let i = 0; i < this.produtos.length; i++) {
      
      let calculadora: Calculadora = new Calculadora(this.produtos[i]);
      this.produtos[i].valorVenda = calculadora.calcularValorProduto();
      this.produtos[i].margemContribuicao = calculadora.calcularMargemContribuicao(this.produtos[i].valorVenda);
      
    }
    
  }  

  atualizarMargemContribuicao(produto: Produto) {
        let calculadora: Calculadora = new Calculadora(produto);
        produto.margemContribuicao = calculadora.calcularMargemContribuicao(produto.valorVenda);
    }

  redefinirMargemContribuicao(margemContribuicao){
    this.nfe.margemContribuicao = margemContribuicao;
    this.calcularValorVenda();
  }

  redefinirCustos(formCustos) { // TODO: passar dado no formato {objeto} ao invés de formCustos
    this.nfe.percentualFrete = formCustos.value.frete / 100;
      this.nfe.percentualFronteira = formCustos.value.fronteira / 100;
      this.nfe.comissaoVendas = formCustos.value.comissaoVendedor / 100;
      this.nfe.percentualSimples = formCustos.value.aliquotaSimples / 100;
      this.nfe.percentualCartao = formCustos.value.taxaCartao / 100;
      this.nfe.comissaoVendas = formCustos.value.comissaoVendedor / 100;
      this.nfe.taxasAdicionais = formCustos.value.taxasAdicionais / 100;
      this.nfe.valorAdicional = Number(formCustos.value.valorAdicional);
      this.nfe.margemLucro = 0//formCustos.value.margemLucro / 100;
      this.nfe.percentualDespesasFixas = 0//formCustos.value.despesasFixas / 100;
      this.nfe.margemContribuicao = Number(formCustos.value.margemContribuicao);
      this.calcularValorVenda();
  }

  extrairProdutos(xml) {
    return [{}];
  }

  readNFE(input) {
    if (NFE.isValidFile(input.files)) {
      if (this.produtos.length > 0) {
        this.produtos = new Array<any>();
      }

      for (var index = 0; index < input.files.length; index++) {
        let reader = new FileReader();
        reader.onload = () => {
          // this 'text' is the content of the file
          var text = reader.result;
          let parser = new DOMParser();
          let xmlDoc = parser.parseFromString(text, "text/xml");
          let detalhamentosProdutos = xmlDoc.getElementsByTagName("det");
          for (let i = 0; i < detalhamentosProdutos.length; i++) {

            let produto = detalhamentosProdutos[i].getElementsByTagName("prod")[0];
            let descricao = produto.getElementsByTagName("xProd")[0].textContent;
            let quantidade = Number(produto.getElementsByTagName("qCom")[0].textContent);
            let valorUnitario = produto.getElementsByTagName("vUnCom")[0].textContent;
            let imposto = detalhamentosProdutos[i].getElementsByTagName("imposto")[0];
            let icms = imposto.getElementsByTagName("ICMS")[0];
            for (let j = 0; j < icms.childNodes.length; j++) {
              let dado = icms.childNodes[j].nodeName;
              //let regex = new RegExp('/ICMS[.*]/', 'i');
              let match = dado.match('ICMS.*');
              if (match.length > 0) {
                let tipoICMS = icms.getElementsByTagName(match[0])[0];
                let tagValorICMS = tipoICMS.getElementsByTagName("vICMS")[0];
                var valorICMS = null;
                if (tagValorICMS != null) {
                  valorICMS = tagValorICMS.textContent;
                } else {
                  valorICMS = Number(valorUnitario) * 0.12;
                }
              }
            }

            let tagIPI = imposto.getElementsByTagName("IPI")[0];
            let valorIPI = 0;
            if (tagIPI != null) {
              let tagIPITrib = tagIPI.getElementsByTagName("IPITrib")
              if (tagIPITrib.length > 0) {
                let tagValorIPI = tagIPITrib[0].getElementsByTagName("vIPI");
                if (tagValorIPI.length > 0) {
                  valorIPI = Number(tagValorIPI[0].textContent);
                  valorIPI = valorIPI / quantidade;
                }
              }

            }


            let produtoNfe = new Produto(this.nfe);
            produtoNfe.descricao = descricao;
            produtoNfe.quantidade = quantidade;
            produtoNfe.valorUnitario = Number(valorUnitario);
            produtoNfe.icms = Number(valorICMS);
            produtoNfe.ipi = valorIPI;
            let calculadora: Calculadora = new Calculadora(produtoNfe);


            /*produtoNfe.valorVenda = calculadora.calcularValorProduto();
            produtoNfe.margemContribuicao = calculadora.calcularMargemContribuicao(produtoNfe.valorVenda);*/
           
            this.produtos.push(produtoNfe);
          }

          this.calcularValorVenda();
        }
        reader.readAsText(input.files[index]);

      }

    }
  }


}
