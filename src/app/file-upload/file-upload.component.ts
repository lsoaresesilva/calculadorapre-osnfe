import { Component, OnInit } from '@angular/core';
import {Produto} from '../models/produto';
import {Calculadora} from '../models/calculadora';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

   produtos:Array<Produto>;

  constructor() { 
    this.produtos = new Array<any>();
    
  }

  ngOnInit() {
  }

  atualizarMargemContribuicao(produto:Produto){
      let calculadora:Calculadora = new Calculadora(produto);
      produto.margemContribuicao = calculadora.calcularMargemContribuicao(produto.valorFinal);
  }

  openFile(event) {
    let input = event.target;
    for (var index = 0; index < input.files.length; index++) {
        let reader = new FileReader();
        reader.onload = () => {
            // this 'text' is the content of the file
            var text = reader.result;
            let parser = new DOMParser();
            let xmlDoc = parser.parseFromString(text, "text/xml");
            let detalhamentosProdutos = xmlDoc.getElementsByTagName("det");
            for(let i = 0; i < detalhamentosProdutos.length; i++){
                
                let produto = detalhamentosProdutos[i].getElementsByTagName("prod")[0];
                let descricao = produto.getElementsByTagName("xProd")[0].textContent;
                let quantidade = produto.getElementsByTagName("qCom")[0].textContent;
                let valorUnitario = produto.getElementsByTagName("vUnCom")[0].textContent;
                let imposto = detalhamentosProdutos[i].getElementsByTagName("imposto")[0];
                let icms = imposto.getElementsByTagName("ICMS")[0];
                for(let j = 0; j < icms.childNodes.length; j++){
                    let dado = icms.childNodes[j].nodeName;
                    //let regex = new RegExp('/ICMS[.*]/', 'i');
                    let match = dado.match('ICMS.*');
                    if(match.length > 0){
                        let tipoICMS = icms.getElementsByTagName(match[0])[0];
                        let tagValorICMS = tipoICMS.getElementsByTagName("vICMS")[0];
                        var valorICMS = null;
                        if( tagValorICMS != null ){
                            valorICMS = tagValorICMS.textContent;
                        }else{
                            valorICMS = Number(valorUnitario)*0.12;
                        }
                    }
                }

                let tagIPI = imposto.getElementsByTagName("IPI")[0];
                let valorIPI = "0";
                if( tagIPI != null)
                {
                    let  tagIPITrib = tagIPI.getElementsByTagName("IPITrib")
                    if( tagIPITrib.length > 0){
                        let tagValorIPI = tagIPITrib[0].getElementsByTagName("vIPI");
                        if( tagValorIPI.length > 0){
                            valorIPI = tagValorIPI[0].textContent;
                        }
                    }
                    
                }
                
                
                let produtoNfe = new Produto();
                produtoNfe.descricao = descricao;
                produtoNfe.quantidade = Number(quantidade);
                produtoNfe.valorUnitario = Number(valorUnitario);
                produtoNfe.icms = Number(valorICMS);
                produtoNfe.ipi = Number(valorIPI);
                let calculadora:Calculadora = new Calculadora(produtoNfe);
                
                
                produtoNfe.valorFinal = calculadora.calcularValorProduto();
                produtoNfe.margemContribuicao = calculadora.calcularMargemContribuicao(produtoNfe.valorFinal);
                this.produtos.push(produtoNfe);
            }
        }
        reader.readAsText(input.files[index]);
        
    };
  }
}