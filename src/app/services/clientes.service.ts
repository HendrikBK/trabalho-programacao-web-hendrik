import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente.model';
import { db, DbService } from './db.service';

@Injectable({ providedIn: 'root' })
export class ClienteService {
  constructor(private dbService: DbService) {}

  async addCliente(cliente: Cliente) {
    return this.dbService.clientes.add(cliente);
  }

  async getAllClientes(): Promise<Cliente[]> {
    return this.dbService.clientes.toArray();
  }

  async getClienteById(id: number) {
    return db.clientes.get(id);
  }

  async deleteCliente(id: number) {
    return this.dbService.clientes.delete(id);
  }

  async updateCliente(cliente: Cliente): Promise<number> {
    return await this.dbService.clientes.put(cliente);
  }
}
