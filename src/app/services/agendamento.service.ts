import { Injectable } from '@angular/core';
import { DbService } from './db.service';
import { Agendamento } from '../models/agendamento.model';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {

  constructor(private dbService: DbService) { }
  async addAgendamento(agendamento: Agendamento): Promise<number> {
    return await this.dbService.agendamentos.add(agendamento);
  }
  async getAllAgendamentos(): Promise<Agendamento[]> {
    return await this.dbService.agendamentos.toArray();
  }
  async getAgendamentoById(id: number): Promise<Agendamento | undefined> {
    return await this.dbService.agendamentos.get(id);
  }
  async updateAgendamento(agendamento: Agendamento): Promise<number> {
    return await this.dbService.agendamentos.put(agendamento);
  }
  async deleteAgendamento(id: number): Promise<void> {
    return await this.dbService.agendamentos.delete(id);
  }
}
