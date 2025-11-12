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

@Component({
  selector: 'app-cadastro-agendamento',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cadastro-agendamento.component.html',
  styleUrl: './cadastro-agendamento.component.css'
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
    valor: [null as number | null],
    servicoId: [null as number | null, Validators.required],
    animalId: [null as number | null, Validators.required]
  });
  router: any;
  constructor(private agendamentoService: AgendamentoService, private animalService: AnimalService, private servicoService: ServicoService) { }

  ngOnInit() {
    this.animalService.getAllAnimais().then((animais)=>{
      this.animais = animais;
    });
    this.servicoService.getAllServicos().then((servicos)=>{
      this.servicos = servicos;
    });
  }

  addAgendamento() {
    if (this.formAgendamento.valid) {
      const horarioDate = new Date(this.formAgendamento.value.data!);
      const novoAgendamento: Agendamento = {
        data: horarioDate,
        inicio: horarioDate,
        fim: horarioDate,
        servicoId: Number(this.formAgendamento.value.servicoId!),
        animalId: Number(this.formAgendamento.value.animalId!)
      };
      this.agendamentoService.addAgendamento(novoAgendamento).then(() => {
        Swal.fire('Cadastro realizado!', 'O agendamento foi cadastrado com sucesso.', 'success');
        this.router.navigate(['agendamentos/listar-agendamentos']);
      });
    }
  }

}
