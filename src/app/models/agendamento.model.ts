import { Animal } from "./animal.model";
import { Servico } from "./servico.model";

export class Agendamento {
    id?: number;
    servicoId: number;
    servicoNome?: string;
    animalId: number;
    animalNome?: string;
    data: Date;
    inicio: string;
    fim: string;
    comentario?: string;

    constructor(id:number, servicoId: number, animalId: number, data: Date, inicio: string, fim: string) {
        this.id = id,
        this.servicoId = servicoId,
        this.animalId = animalId,
        this.data = data,
        this.inicio = inicio,
        this.fim = fim
    }
}