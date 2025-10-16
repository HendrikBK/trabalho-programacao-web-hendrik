import { Injectable } from '@angular/core';
import { Servico } from '../models/servico.model';
import { DbService } from './db.service';

@Injectable(
  { providedIn: 'root' }
)

export class ServicoService {
  constructor(private dbService: DbService) { }
  addServico(servico: Servico) {
    return this.dbService.servicos.add(servico);
  }
  getAllServicos(): Promise<Servico[]> {
    return this.dbService.servicos.toArray();
  }
}