import {NFE} from './nfe'

export class Produto{

    descricao:String;
    quantidade:number;
    valorUnitario:number;
    valorFinal:number;
    icms:number;
    ipi:number;
    margemContribuicao:number;
    nfe:NFE;

    constructor(){
        this.nfe = new NFE();
        this.valorFinal = 0;
    }

    


    

    
}