import { Component } from '@angular/core';
import { Animal } from '../../../models/animal.model';
import { AnimalService } from '../../../services/animais.service';
import { ClienteService } from '../../../services/clientes.service';
import { Cliente } from '../../../models/cliente.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-animal',
  imports: [],
  templateUrl: './listar-animal.component.html',
  styleUrl: './listar-animal.component.css'
})
export class ListarAnimalComponent {
  clientesMap: Map<number, string> = new Map();
  animais: Animal[] = [];
  clientes: Cliente[] = [];
  constructor(private animalservice: AnimalService, private clienteService: ClienteService, private router: Router) { }

  ngOnInit() {
    this.getAllAnimais();
    this.clienteService.getAllClientes().then((clientes) => {
      this.clientes = clientes;
    });

  }

  getAllAnimais() {
    this.animalservice.getAllAnimais().then((animais: Animal[]) => {
      this.animais = animais;
      this.resolveNomesClientes();
    });
  }

  resolveNomesClientes() {
    console.log(this.animais);

    this.animais.forEach(animal => {
      if (animal.clienteId) {
        if (this.clientesMap.has(animal.clienteId)) {
          animal.clienteNome = this.clientesMap.get(animal.clienteId);
        } else {
          this.clienteService.getClienteById(animal.clienteId)
            .then((cliente: Cliente | undefined) => {
              if (cliente !== undefined) {
                animal.clienteNome = cliente.nome;
                this.clientesMap.set(animal.clienteId!, cliente.nome);
              }
            });
        }
      }
    });
  }

  editAnimal(id: number) {
    this.router.navigate(['/animais/editar-animal', id]);
  }

  deleteAnimal(id: number) {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Esta ação não pode ser desfeita!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.animalservice.deleteAnimal(id).then(() => {
          this.getAllAnimais();
        });
        Swal.fire('Excluído!', 'O animal foi excluído com sucesso.', 'success');
      }
    });
  }
}
