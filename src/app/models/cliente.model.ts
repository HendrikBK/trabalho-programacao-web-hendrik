export class Cliente {    
    id: number;
    cpf: string;
    nome: string;
    fone: string;
    constructor(id: number, cpf: string, nome: string, fone: string) {
        this.id = id,
        this.cpf = cpf,
        this.nome = nome,
        this.fone = fone
    }
}
