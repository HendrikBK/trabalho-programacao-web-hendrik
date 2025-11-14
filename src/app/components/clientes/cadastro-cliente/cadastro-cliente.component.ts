import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ClienteService } from '../../../services/clientes.service';
import { Cliente } from '../../../models/cliente.model';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastro-cliente',
  imports: [ReactiveFormsModule],
  templateUrl: './cadastro-cliente.component.html',
  styleUrl: './cadastro-cliente.component.css',
})
export class CadastroClienteComponent {
  clientes: Cliente[] = [];
  formCliente = new FormGroup({
    nome: new FormControl(''),
    cpf: new FormControl(''),
    fone: new FormControl(''),
  });

  clienteId!: number;

  constructor(
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit() {
    this.clienteId = Number(this.route.snapshot.paramMap.get('id'));

    this.clienteId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.clienteId) {
      const cliente = await this.clienteService.getClienteById(this.clienteId);
      if (cliente) {
        this.formCliente.patchValue({
          nome: cliente.nome,
          cpf: cliente.cpf,
          fone: cliente.fone,
        });
      }
    }

    this.clienteService.getAllClientes().then((clientes) => {
      this.clientes = clientes;
    });
  }

  editCliente() {
    const clienteEditado: Cliente = {
      id: this.clienteId,
      nome: this.formCliente.value.nome!,
      cpf: this.formCliente.value.cpf!,
      fone: this.formCliente.value.fone!,
    };
    this.clienteService.updateCliente(clienteEditado).then(() => {
      Swal.fire(
        'Cadastro atualizado!',
        'O cliente foi atualizado com sucesso.',
        'success'
      );
      this.router.navigate(['clientes/listar-clientes']);
    });
  }

  addCliente() {
    if (this.formCliente.valid) {
      if (!this.clienteId) {
        const novoCliente: Cliente = {
          nome: this.formCliente.value.nome!,
          cpf: this.formCliente.value.cpf!,
          fone: this.formCliente.value.fone!,
        };
        this.clienteService.addCliente(novoCliente).then(() => {
          this.formCliente.reset();
                    Swal.fire(
                      'Cadastro realizado!',
                      'O cliente foi cadastrado com sucesso.',
                      'success'
                    );
                    this.router.navigate(['clientes/listar-clientes']);
        });
      } else {
        this.editCliente();
      }
    }
  }
}
