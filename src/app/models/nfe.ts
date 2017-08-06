export class NFE {
    percentualDespesasFixas: number;
    percentualSimples: number;
    percentualCartao: number;
    comissaoVendas: number;
    taxasAdicionais: number;
    margemLucro: number;
    valorAdicional: number;
    percentualFrete: number;
    percentualFronteira: number;
    margemContribuicao: number;

    constructor() {
        /*this.percentualDespesasFixas = 0.43 // as despesas fixas representam 50% do que entra na loja (total anual de despesas fixas ÷ total anual de vendas x 100).
        this.percentualSimples = 0.045;
        this.percentualCartao = 0.05;
        this.comissaoVendas = 0.02;
        this.taxasAdicionais = 0.1;
        this.margemLucro = 0.2;
        this.valorSacolas = 2;
        this.percentualFrete = 0;
        this.percentualFronteira = 0.1;*/
        this.percentualDespesasFixas = 0; // as despesas fixas representam 50% do que entra na loja (total anual de despesas fixas ÷ total anual de vendas x 100).
        this.percentualSimples = 0;
        this.percentualCartao = 0;
        this.comissaoVendas = 0;
        this.taxasAdicionais = 0;
        this.margemLucro = 0;
        this.valorAdicional = 0;
        this.percentualFrete = 0;
        this.percentualFronteira = 0;
        this.margemContribuicao = 50;
    }

    static isValidFile(file) {
        if (file.length > 0) {
            if (file[0].type == "text/xml") {
                return true;
            }
        }

        return false;
    }


}