import {Loja} from './loja'

export class Produto{

    descricao:String;
    quantidade:number;
    valorUnitario:number;
    valorFinal:number;
    icms:number;
    ipi:number;
    margemContribuicao:number;
    loja:Loja;

    constructor(){
        this.loja = new Loja();
    }

    calcularCustoFixoProduto(){
        let custoFixoProduto = this.icms +
                               this.ipi +
                               this.valorUnitario*this.loja.percentualFrete+
                               this.valorUnitario*this.loja.percentualFronteira;
        return custoFixoProduto;
    }


    calcularValorProduto(produto:Produto){
      
        
        let custoFixoProduto = this.calcularCustoFixoProduto();
        
        let valorTotal = produto.valorUnitario + custoFixoProduto;
        valorTotal = valorTotal+(valorTotal*this.loja.percentualSimples);
        valorTotal = valorTotal+(valorTotal*this.loja.percentualCartao);
        valorTotal = valorTotal+(valorTotal*this.loja.comissaoVendas);
        valorTotal = valorTotal+(valorTotal*this.loja.taxasAdicionais);
        valorTotal = valorTotal+(valorTotal*this.loja.margemLucro);
        valorTotal = valorTotal+this.loja.valorSacolas;
         
        let margemContribuicao = this.calcularMargemContribuicao(valorTotal);
        if( margemContribuicao <  27.0){
                this.loja.margemLucro += 0.02;
                valorTotal = this.calcularValorProduto(produto);
        } 

        return valorTotal;
    }

    calcularMargemContribuicao(valorTotalProduto){
            // MC = PV – ( CV + DV )
            //let 
            //let margemContribuicao = (produto.valorUnitario)
            let custoVariavelProduto = valorTotalProduto*this.loja.percentualSimples +
                                       valorTotalProduto*this.loja.percentualCartao +
                                       valorTotalProduto*this.loja.percentualCartao +
                                       valorTotalProduto*this.loja.comissaoVendas +
                                       valorTotalProduto*this.loja.taxasAdicionais;
            let margemContribuicao = (valorTotalProduto-custoVariavelProduto-this.calcularCustoFixoProduto());
            margemContribuicao = margemContribuicao/valorTotalProduto;
            margemContribuicao = margemContribuicao*100;
            return margemContribuicao;
    }

    
}