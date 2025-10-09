import { Animal } from "./animal.model";
import { Servico } from "./servico.model";

export class Agendamento {
    servico: Servico;
    animal: Animal;
    data: Date;
    inicio: Date;
    fim: Date;
    comentario?: string;

    constructor(servico: Servico, animal: Animal, data: Date, inicio: Date, fim: Date) {
        this.servico = servico,
        this.animal = animal,
        this.data = data,
        this.inicio = inicio,
        this.fim = fim
    }
}