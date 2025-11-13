import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente.model';
import { db, DbService } from './db.service';

@Injectable(
  { providedIn: 'root' }
)

export class ClienteService {
  constructor(private dbService: DbService) { }
  
  addCliente(cliente: Cliente) {
    return this.dbService.clientes.add(cliente);
  }
  
  getAllClientes(): Promise<Cliente[]> {
    return this.dbService.clientes.toArray();
  }

  getClienteById(id: number) {
    return db.clientes.get(id);    
  }

  deleteCliente(id: number) {
    return this.dbService.clientes.delete(id);
  }
}