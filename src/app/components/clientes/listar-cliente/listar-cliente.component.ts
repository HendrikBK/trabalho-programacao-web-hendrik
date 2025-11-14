import { Component } from '@angular/core';
import { Cliente } from '../../../models/cliente.model';
import { ClienteService } from '../../../services/clientes.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-cliente',
  imports: [],
  templateUrl: './listar-cliente.component.html',
  styleUrl: './listar-cliente.component.css'
})
export class ListarClienteComponent {
  clientes: Cliente[] = [];
  constructor(private clienteservice: ClienteService, private router: Router) { }
  ngOnInit() {
    this.getAllClientes();
  }
  getAllClientes() {
    this.clienteservice.getAllClientes().then((clientes: Cliente[]) => {
      this.clientes = clientes;
    });
  }

  
  editCliente(id: number) {
    this.router.navigate(['/clientes/editar-cliente', id]);
  }

  deleteCliente(id: number) {
      Swal.fire({
        title: 'Tem certeza?',
        text: 'Esta ação não pode ser desfeita!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, excluir!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.clienteservice.deleteCliente(id).then(() => {
            this.getAllClientes();
          });
          Swal.fire('Excluído!', 'O cliente foi excluído com sucesso.', 'success');
        }
      });
    }
}
