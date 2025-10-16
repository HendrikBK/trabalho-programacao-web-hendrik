import { Animal } from "./animal.model";
import { Servico } from "./servico.model";

export class Agendamento {
    id: number;
    servicoId: number;
    animalId: number;
    data: Date;
    inicio: Date;
    fim: Date;
    comentario?: string;

    constructor(id:number, servicoId: number, animalId: number, data: Date, inicio: Date, fim: Date) {
        this.id = id,
        this.servicoId = servicoId,
        this.animalId = animalId,
        this.data = data,
        this.inicio = inicio,
        this.fim = fim
    }
}