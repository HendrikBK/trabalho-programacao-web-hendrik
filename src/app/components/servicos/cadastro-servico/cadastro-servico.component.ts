import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServicoService } from '../../../services/servicos.service';
import { Servico } from '../../../models/servico.model';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-cadastro-servico',
  imports: [ReactiveFormsModule],
  templateUrl: './cadastro-servico.component.html',
  styleUrl: './cadastro-servico.component.css'
})
export class CadastroServicoComponent {
  servicos: Servico[] = [];
  formServico = new FormGroup({
    nome: new FormControl(''),
    idade: new FormControl(''),
    especie: new FormControl(''),
    clienteId: new FormControl('')
  });

  constructor(private servicoService: ServicoService) { }

  addServico() {
    if (this.formServico.valid) {
      const novoServico: Servico = {
        nome: this.formServico.value.nome!,
      };
      this.servicoService.addServico(novoServico).then(() => {
        this.formServico.reset();
      });
    }
  }
}