import { Component } from '@angular/core';
import { Cliente } from '../../../models/cliente.model';
import { ClienteService } from '../../../services/clientes.service';

@Component({
  selector: 'app-listar-cliente',
  imports: [],
  templateUrl: './listar-cliente.component.html',
  styleUrl: './listar-cliente.component.css'
})
export class ListarClienteComponent {
  clientes: Cliente[] = [];
  constructor(private clienteservice: ClienteService) { }
  ngOnInit() {
    this.getAllClientes();
  }
  getAllClientes() {
    this.clienteservice.getAllClientes().then((clientes: Cliente[]) => {
      this.clientes = clientes;
    });
  }
}
