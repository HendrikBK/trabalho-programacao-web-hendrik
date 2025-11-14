import { Component } from '@angular/core';
import { Animal } from '../../../models/animal.model';
import { AnimalService } from '../../../services/animais.service';
import { ClienteService } from '../../../services/clientes.service';
import { Cliente } from '../../../models/cliente.model';
import { Agendamento } from '../../../models/agendamento.model';
import { Servico } from '../../../models/servico.model';
import { ServicoService } from '../../../services/servicos.service';
import { AgendamentoService } from '../../../services/agendamento.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-agendamento',
  imports: [CommonModule],
  templateUrl: './listar-agendamentos.component.html',
  styleUrl: './listar-agendamentos.component.css'
})
export class ListarAgendamentosComponent {
  animaisMap: Map<number, string> = new Map();
  servicosMap: Map<number, string> = new Map();
  agendamentos: Agendamento[] = [];
  animais: Animal[] = [];
  servicos: Servico[] = [];
  constructor(private animalService: AnimalService, private servicoService: ServicoService, private agendamentoService: AgendamentoService, private router: Router) { }

  ngOnInit() {
    this.getAllAgendamentos();
    this.animalService.getAllAnimais().then((animais) => {
      this.animais = animais;
    });
    this.servicoService.getAllServicos().then((servicos) => {
      this.servicos = servicos;
    });

  }

  getAllAgendamentos() {
    this.agendamentoService.getAllAgendamentos().then((agendamentos: Agendamento[]) => {
      this.agendamentos = agendamentos;
      this.resolveNomesAnimais();
      this.resolveNomesServicos();
    });
  }

  resolveNomesAnimais() {
    console.log(this.animais);

    this.agendamentos.forEach(agendamento => {
      if (agendamento.animalId) {
        if (this.animaisMap.has(agendamento.animalId)) {
          agendamento.animalNome = this.animaisMap.get(agendamento.animalId);
        } else {
          this.animalService.getAnimalById(agendamento.animalId)
            .then((animal: Animal | undefined) => {
              if (animal !== undefined) {
                agendamento.animalNome = animal.nome;
                this.animaisMap.set(agendamento.animalId!, animal.nome);
              }
            });
        }
      }
    });
  }

  resolveNomesServicos() {
    console.log(this.servicos);

    this.agendamentos.forEach(agendamento => {
      if (agendamento.servicoId) {
        if (this.servicosMap.has(agendamento.servicoId)) {
          agendamento.servicoNome = this.servicosMap.get(agendamento.servicoId);
        } else {
          this.servicoService.getServicoById(agendamento.servicoId)
            .then((servico: Servico | undefined) => {
              if (servico !== undefined) {
                agendamento.servicoNome = servico.nome;
                this.servicosMap.set(agendamento.animalId!, servico.nome);
              }
            });
        }
      }
    });
  }

  editAgendamento(id: number) {
    this.router.navigate(['/agendamentos/editar-agendamento', id]);
  }

  deleteAgendamento(id: number) {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Esta ação não pode ser desfeita!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.agendamentoService.deleteAgendamento(id).then(() => {
          this.getAllAgendamentos();
        });
        Swal.fire('Excluído!', 'O animal foi excluído com sucesso.', 'success');
      }
    });
  }

}
