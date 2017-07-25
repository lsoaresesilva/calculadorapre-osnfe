import {Produto} from './produto';

export class Calculadora{

    produto:Produto;

    constructor(produto:Produto){
        this.produto = produto;
    }

    calcularCustoFixoProduto(){
        let custoFixoProduto = //this.produto.icms +
                               this.produto.ipi +
                               this.produto.valorUnitario*this.produto.nfe.percentualFrete+
                               this.produto.valorUnitario*this.produto.nfe.percentualFronteira;
        return custoFixoProduto;
    }

    calcularValorProduto(){
      
        
        let custoFixoProduto = this.calcularCustoFixoProduto();
        let proporcaoDespesasFixas = this.produto.valorUnitario*this.produto.nfe.percentualDespesasFixas;
        
        let valorTotal = this.produto.valorUnitario + custoFixoProduto + proporcaoDespesasFixas;
        valorTotal = valorTotal+(valorTotal*this.produto.nfe.percentualSimples);
        valorTotal = valorTotal+(valorTotal*this.produto.nfe.percentualCartao);
        valorTotal = valorTotal+(valorTotal*this.produto.nfe.comissaoVendas);
        valorTotal = valorTotal+(valorTotal*this.produto.nfe.taxasAdicionais);
        valorTotal = valorTotal+(valorTotal*this.produto.nfe.margemLucro);
        valorTotal = valorTotal+this.produto.nfe.valorSacolas;
         
        let margemContribuicao = this.calcularMargemContribuicao(valorTotal);
        if( margemContribuicao <  27.0){
                this.produto.nfe.margemLucro += 0.02;
                valorTotal = this.calcularValorProduto();
        } 

        return valorTotal;
    }

    calcularMargemContribuicao(valorTotalProduto){
            // MC = PV – ( CV + DV )
            //let 
            //let margemContribuicao = (produto.valorUnitario)
            let despesaVariavelProduto = valorTotalProduto*this.produto.nfe.percentualSimples +
                                       valorTotalProduto*this.produto.nfe.percentualCartao +
                                       valorTotalProduto*this.produto.nfe.comissaoVendas +
                                       valorTotalProduto*this.produto.nfe.taxasAdicionais + 
                                       this.produto.nfe.valorSacolas;
            let custoFixoProduto = this.calcularCustoFixoProduto()+this.produto.valorUnitario;

            let margemContribuicao = (valorTotalProduto-despesaVariavelProduto-custoFixoProduto);
            margemContribuicao = margemContribuicao/valorTotalProduto;
            margemContribuicao = margemContribuicao*100;
            return margemContribuicao;
    }

    
}

