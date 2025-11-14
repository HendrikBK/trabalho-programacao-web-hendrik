import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ServicoService } from '../../../services/servicos.service';
import { Servico } from '../../../models/servico.model';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-cadastro-servico',
  imports: [ReactiveFormsModule],
  templateUrl: './cadastro-servico.component.html',
  styleUrl: './cadastro-servico.component.css',
})
export class CadastroServicoComponent {
  servicos: Servico[] = [];
  formServico = new FormGroup({
    nome: new FormControl(''),
  });

  servicoId!: number;

  constructor(
    private servicoService: ServicoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit() {
    this.servicoId = Number(this.route.snapshot.paramMap.get('id'));

    this.servicoId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.servicoId) {
      const servico = await this.servicoService.getServicoById(this.servicoId);
      if (servico) {
        this.formServico.patchValue({
          nome: servico.nome,
        });
      }
    }

    this.servicoService.getAllServicos().then((servicos) => {
      this.servicos = servicos;
    });
  }

  editServico() {
    const servicoEditado: Servico = {
      id: this.servicoId,
      nome: this.formServico.value.nome!,
    };
    this.servicoService.updateServico(servicoEditado).then(() => {
      Swal.fire(
        'Cadastro atualizado!',
        'O servico foi atualizado com sucesso.',
        'success'
      );
      this.router.navigate(['servicos/listar-servicos']);
    });
  }

  addServico() {
    if (this.formServico.valid) {
      if (!this.servicoId) {
        const novoServico: Servico = {
          nome: this.formServico.value.nome!,
        };
        this.servicoService.addServico(novoServico).then(() => {
          this.formServico.reset();
          Swal.fire(
            'Cadastro realizado!',
            'O servico foi cadastrado com sucesso.',
            'success'
          );
          this.router.navigate(['servicos/listar-servicos']);
        });
      } else {
        this.editServico();
      }
    }
  }
}
