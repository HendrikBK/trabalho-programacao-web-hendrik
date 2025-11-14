import { Injectable } from '@angular/core';
import { Servico } from '../models/servico.model';
import { db, DbService } from './db.service';

@Injectable({ providedIn: 'root' })
export class ServicoService {
  constructor(private dbService: DbService) {}
  async addServico(servico: Servico) {
    return this.dbService.servicos.add(servico);
  }
  async getAllServicos(): Promise<Servico[]> {
    return this.dbService.servicos.toArray();
  }

  async getServicoById(id: number) {
    return db.servicos.get(id);
  }

  async deleteServico(id: number) {
    return this.dbService.servicos.delete(id);
  }

  async updateServico(servico: Servico): Promise<number> {
    return await this.dbService.servicos.put(servico);
  }
}
