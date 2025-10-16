import { Cliente } from "./cliente.model";

export class Animal {
    id: number;
    nome: string;
    idade: number;
    especie: String;
    clienteId: number;
    constructor(id: number, nome: string, idade: number, especie: string, clienteId: number) {
        this.id = id,
        this.nome = nome,
        this.idade = idade,
        this.especie = especie,
        this.clienteId = clienteId
    }
}
