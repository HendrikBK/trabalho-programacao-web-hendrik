import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Animal } from '../../../models/animal.model';
import { Cliente } from '../../../models/cliente.model';
import { Servico } from '../../../models/servico.model';
import { Agendamento } from '../../../models/agendamento.model';
import { AgendamentoService } from '../../../services/agendamento.service';
import Swal from 'sweetalert2';
import { AnimalService } from '../../../services/animais.service';
import { ServicoService } from '../../../services/servicos.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cadastro-agendamento',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cadastro-agendamento.component.html',
  styleUrl: './cadastro-agendamento.component.css',
})
export class CadastroAgendamentoComponent {
  clientes: Cliente[] = [];
  animais: Animal[] = [];
  servicos: Servico[] = [];
  agendamentoId!: number;
  valorDoAgendamento: number = 0;
  private fb = inject(FormBuilder);
  formAgendamento = this.fb.group({
    data: ['', Validators.required],
    inicio: ['', Validators.required],
    fim: ['', Validators.required],
    servicoId: [null as number | null, Validators.required],
    animalId: [null as number | null, Validators.required],
  });
  router: any;
  constructor(
    private agendamentoService: AgendamentoService,
    private animalService: AnimalService,
    private servicoService: ServicoService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    this.agendamentoId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.agendamentoId) {
      const agendamento = await this.agendamentoService.getAgendamentoById(
        this.agendamentoId
      );
      if (agendamento) {
        console.log(agendamento);

        //const data = agendamento.data.toISOString().substring(0,10);
        const nova_data = new Date(
          agendamento.data.getTime() -
            agendamento.data.getTimezoneOffset() * 60000
        )
          .toISOString()
          .substring(0, 10);

        this.formAgendamento.patchValue({
          data: nova_data,
          inicio: agendamento.inicio,
          fim: agendamento.fim,
          servicoId: agendamento.servicoId,
          animalId: agendamento.animalId,
        });
      }
    }

    this.animalService.getAllAnimais().then((animais) => {
      this.animais = animais;
    });
    this.servicoService.getAllServicos().then((servicos) => {
      this.servicos = servicos;
    });
  }

  editAgendamento() {
    const agendamentoEditado: Agendamento = {
      id: this.agendamentoId,
      data: new Date(this.formAgendamento.value.data!),
      inicio: this.formAgendamento.value.inicio!,
      fim: this.formAgendamento.value.fim!,
      servicoId: this.formAgendamento.value.servicoId!,
      animalId: this.formAgendamento.value.animalId!,
    };
    this.agendamentoService.updateAgendamento(agendamentoEditado).then(() => {
      Swal.fire(
        'Cadastro atualizado!',
        'O agendamento foi atualizado com sucesso.',
        'success'
      );
      this.router.navigate(['agendamentos/listar-agendamentos']);
    });
  }

  addAgendamento() {
    if (this.formAgendamento.valid) {
      if (!this.agendamentoId) {
        const horarioDate = new Date(this.formAgendamento.value.data!);
        const horarioInicio = this.formAgendamento.value.inicio!;
        const horarioFim = this.formAgendamento.value.fim!;

        const novoAgendamento: Agendamento = {
          data: horarioDate,
          inicio: horarioInicio,
          fim: horarioFim,
          servicoId: Number(this.formAgendamento.value.servicoId!),
          animalId: Number(this.formAgendamento.value.animalId!),
        };
        this.agendamentoService.addAgendamento(novoAgendamento).then(() => {
          Swal.fire(
            'Cadastro realizado!',
            'O agendamento foi cadastrado com sucesso.',
            'success'
          );
          this.router.navigate(['agendamentos/listar-agendamentos']);
        });
      } else {
        this.editAgendamento();
      }
    }
  }
}
