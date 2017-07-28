import { Component, OnInit } from '@angular/core';
import { Produto } from '../models/produto';
import { Calculadora } from '../models/calculadora';
import { NFE } from "app/models/nfe";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import {Message} from 'primeng/primeng';

@Component({
    selector: 'app-file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

    produtos: Array<Produto>;
    nfe: NFE;
    formCustos: FormGroup;
    agreement: boolean;
    statusMessages:Message[];
    emptyDanfeMessage: string = "Primeiro você precisa importar o XML (DANFE) da sua nota fiscal eletrônica.";
    agreementMessage: string = "É preciso aceitar os termos de uso deste serviço antes de prosseguir."

    constructor(fb: FormBuilder) {
        this.produtos = new Array<any>();
        this.nfe = new NFE();
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
            margemContribuicao: new FormControl('50', Validators.required),
            agreement: new FormControl(false, Validators.required),
        });
        this.agreement = false;
        this.statusMessages = [];
    }

    ngOnInit() {
    }

    setAgreement(event) {
        this.agreement = event.target.checked;
    }

    atualizarMargemContribuicao(produto: Produto) {
        let calculadora: Calculadora = new Calculadora(produto);
        produto.margemContribuicao = calculadora.calcularMargemContribuicao(produto.valorVenda);
    }

    isValidFile(file) {
        if (file.length > 0) {
            if (file[0].type == "text/xml") {
                return true;
            }
        }

        return false;
    }

    recalcularPrecos() {
        for (let i = 0; i < this.produtos.length; i++) {
            this.nfe.percentualFrete = this.formCustos.value.frete / 100;
            this.nfe.percentualFronteira = this.formCustos.value.fronteira / 100;
            this.nfe.comissaoVendas = this.formCustos.value.comissaoVendedor / 100;
            this.nfe.percentualSimples = this.formCustos.value.aliquotaSimples / 100;
            this.nfe.percentualCartao = this.formCustos.value.taxaCartao / 100;
            this.nfe.comissaoVendas = this.formCustos.value.comissaoVendedor / 100;
            this.nfe.taxasAdicionais = this.formCustos.value.taxasAdicionais / 100;
            this.nfe.valorAdicional = Number(this.formCustos.value.valorAdicional);
            this.nfe.margemLucro = 0//this.formCustos.value.margemLucro / 100;
            this.nfe.percentualDespesasFixas = 0//this.formCustos.value.despesasFixas / 100;
            this.nfe.margemContribuicao = Number(this.formCustos.value.margemContribuicao);
            let calculadora: Calculadora = new Calculadora(this.produtos[i]);
            //

            this.produtos[i].valorVenda = calculadora.calcularValorProduto();
            this.produtos[i].margemContribuicao = calculadora.calcularMargemContribuicao(this.produtos[i].valorVenda);
            let x = 2;
        }
    }

    openFile(event) {
        let input = event.target;
        if (this.isValidFile(input.files)) {
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


                        produtoNfe.valorVenda = calculadora.calcularValorProduto();
                        produtoNfe.margemContribuicao = calculadora.calcularMargemContribuicao(produtoNfe.valorVenda);
                        this.produtos.push(produtoNfe);
                    }
                }
                reader.readAsText(input.files[index]);

            }
            this.statusMessages.push({severity:'success', summary:'DANFE importado com sucesso', detail:'O próximo passo é informar os custos.'});
        }
    }
}
