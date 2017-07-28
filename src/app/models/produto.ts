import {NFE} from './nfe'

export class Produto{

    descricao:String;
    quantidade:number;
    valorUnitario:number;
    valorVenda:number;
    icms:number;
    ipi:number;
    margemContribuicao:number;
    nfe:NFE;

    constructor(nfe:NFE){
        this.nfe = nfe
        this.valorVenda = 0;
    }

    


    

    
}