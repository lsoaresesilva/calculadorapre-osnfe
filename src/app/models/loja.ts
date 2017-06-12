export class Loja {
    percentualDespesasFixas:number;
    percentualSimples:number;
    percentualCartao:number;
    comissaoVendas:number;
    taxasAdicionais:number;
    margemLucro:number;
    valorSacolas:number;
    percentualFrete:number;
    percentualFronteira:number;

    constructor(){
        this.percentualDespesasFixas = 0.54 // as despesas fixas representam 54% do que entra na loja (total anual de despesas fixas ÷ total anual de vendas x 100).
        this.percentualSimples = 0.045;
        this.percentualCartao = 0.05;
        this.comissaoVendas = 0.02;
        this.taxasAdicionais = 0.1;
        this.margemLucro = 0.2;
        this.valorSacolas = 2;
        this.percentualFrete = 0.13;
    this.percentualFronteira = 0.08;
    }
}