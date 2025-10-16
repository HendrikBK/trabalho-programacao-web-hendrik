import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';
import { Agendamento } from '../models/agendamento.model';
import { Animal } from '../models/animal.model';
import { Cliente } from '../models/cliente.model';
import { Servico } from '../models/servico.model';

@Injectable({
    providedIn: 'root'
})
export class DbService extends Dexie {
    agendamentos!: Table<Agendamento, number>;
    animais!: Table<Animal, number>;
    clientes!: Table<Cliente, number>;
    servicos!: Table<Servico, number>;
    constructor() {
        super('PetShopDB');
        this.version(1).stores({
            agendamentos: '++id, servicoId, animalId, data, inicio, fim, comentario',
            animais: '++id, nome, idade, especie, clienteId',
            clientes: '++id, cfp, nome, fone',
            servicos: '++id, nome'
        });
    }    
}

export const db = new DbService();