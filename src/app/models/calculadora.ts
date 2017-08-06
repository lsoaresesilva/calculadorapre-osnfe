import { Produto } from './produto';

export class Calculadora {

    produto: Produto;

    constructor(produto: Produto) {
        this.produto = produto;
    }

    calcularCustoFixoProduto() {
        let custoFixoProduto = this.produto.ipi +
            this.produto.valorUnitario * this.produto.nfe.percentualFrete +
            this.produto.valorUnitario * this.produto.nfe.percentualFronteira;
        return custoFixoProduto;
    }

    calcularValorPorMargemContribuicao(margemDesejada) { }

    calcularValorProduto(margemAnterior = null) {



        let custoFixoProduto = this.calcularCustoFixoProduto();
        //let proporcaoDespesasFixas = this.produto.valorUnitario*this.produto.nfe.percentualDespesasFixas;

        let valorTotal = this.produto.valorUnitario + custoFixoProduto// + proporcaoDespesasFixas;
        valorTotal = valorTotal + (valorTotal * this.produto.nfe.percentualSimples);
        valorTotal = valorTotal + (valorTotal * this.produto.nfe.percentualCartao);
        valorTotal = valorTotal + (valorTotal * this.produto.nfe.comissaoVendas);
        valorTotal = valorTotal + (valorTotal * this.produto.nfe.taxasAdicionais);
        valorTotal = valorTotal + (valorTotal * this.produto.nfe.margemLucro);
        valorTotal = Math.round(valorTotal + this.produto.nfe.valorAdicional);

        let margemContribuicao = this.calcularMargemContribuicao(valorTotal);

        // Deadlock
        if (margemAnterior != null) {
            if (margemAnterior < this.produto.nfe.margemContribuicao && margemContribuicao > this.produto.nfe.margemContribuicao) {
                return valorTotal;
            }
        }

        // BUG: QND MARGEM MAIOR N RECALCULA P BAIXO

        if (margemContribuicao < this.produto.nfe.margemContribuicao) {
            this.produto.nfe.margemLucro += 0.02;
            valorTotal = this.calcularValorProduto(margemContribuicao);
        } else if (margemContribuicao >= this.produto.nfe.margemContribuicao &&
            margemContribuicao >= this.produto.nfe.margemContribuicao + 3) {
            this.produto.nfe.margemLucro = 0;
            valorTotal = this.calcularValorProduto(margemContribuicao);
        }


        //this.produto.margemContribuicao = margemContribuicao;

        return valorTotal;
    }

    calcularMargemContribuicao(valorTotalProduto) {
        // MC = PV – ( CV + DV )
        // MC = Margem de contribuição
        // PV = Preço de venda
        // CV = Custo da venda (compra do protudo - produto + frete + ipi)
        // DV = Despesas variáveis (comissões, etc)
        //let 
        //let margemContribuicao = (produto.valorUnitario)
        let despesaVariavelProduto = valorTotalProduto * this.produto.nfe.percentualSimples +
            valorTotalProduto * this.produto.nfe.percentualCartao +
            valorTotalProduto * this.produto.nfe.comissaoVendas +
            valorTotalProduto * this.produto.nfe.taxasAdicionais +
            this.produto.nfe.valorAdicional;
        let custoFixoProduto = this.calcularCustoFixoProduto() + this.produto.valorUnitario;

        let margemContribuicao = (valorTotalProduto - despesaVariavelProduto - custoFixoProduto);
        margemContribuicao = margemContribuicao / valorTotalProduto;
        margemContribuicao = margemContribuicao * 100;
        return Number(margemContribuicao.toFixed(2));
    }


}

