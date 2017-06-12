import {Produto} from './produto';

export class Calculadora{

    percentualDespesasFixas:number;
    percentualSimples:number;
    percentualCartao:number;
    comissaoVendas:number;
    taxasAdicionais:number;
    margemLucro:number;
    valorSacolas:number;

    constructor(){
        this.percentualDespesasFixas = 0.54 // as despesas fixas representam 54% do que entra na loja (total anual de despesas fixas ÷ total anual de vendas x 100).
        this.percentualSimples = 0.045;
        this.percentualCartao = 0.05;
        this.comissaoVendas = 0.02;
        this.taxasAdicionais = 0.1;
        this.margemLucro = 0.2;
        this.valorSacolas = 2;
    }

    calcularCustoFixoProduto(produto:Produto, fronteira, frete){
        let custoFixoProduto = produto.icms +
                               produto.ipi +
                               produto.valorUnitario*fronteira +
                               produto.valorUnitario*frete;
        return custoFixoProduto;
    }

    calcularCustoVariavelProduto(custoFixoProduto){
        let custoVariavelProduto = custoFixoProduto*this.percentualSimples +
                                   custoFixoProduto*this.percentualCartao +
                                   custoFixoProduto*this.comissaoVendas +
                                   custoFixoProduto*this.taxasAdicionais;
        return custoVariavelProduto;
    }

    calcularValorProduto(produto:Produto, fronteira, frete){
      
        
        let custoFixoProduto = this.calcularCustoFixoProduto(produto, fronteira, frete);
        custoFixoProduto = custoFixoProduto+produto.valorUnitario*this.percentualDespesasFixas;
        let custoVariavelProduto = this.calcularCustoVariavelProduto(custoFixoProduto+produto.valorUnitario);
        custoVariavelProduto = custoVariavelProduto+custoFixoProduto*this.margemLucro;
                                   
        let valorTotal = custoFixoProduto + custoVariavelProduto + this.valorSacolas + produto.valorUnitario; 
        let margemContribuicao = this.calcularMargemContribuicao(valorTotal, produto, fronteira, frete);
        if( margemContribuicao <  27.0){
                this.margemLucro += 0.5;
                valorTotal = this.calcularValorProduto(produto, fronteira, frete);
        } 

        return valorTotal;
    }

    
}

