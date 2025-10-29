import { Component } from '@angular/core';
import { Animal } from '../../../models/animal.model';
import { AnimalService } from '../../../services/animais.service';
import { ClienteService } from '../../../services/clientes.service';
import { Cliente } from '../../../models/cliente.model';

@Component({
  selector: 'app-listar-animal',
  imports: [],
  templateUrl: './listar-animal.component.html',
  styleUrl: './listar-animal.component.css'
})
export class ListarAnimalComponent {
  animais: Animal[] = [];
  clientes: Cliente[] = [];
  constructor(private animalservice: AnimalService,  private clienteService: ClienteService) { }
  ngOnInit() {
    this.getAllAnimais();
    this.clienteService.getAllClientes().then((clientes)=>{
      this.clientes = clientes;
    })
  }
  getAllAnimais() {
    this.animalservice.getAllAnimais().then((animais: Animal[]) => {
      this.animais = animais;
    });
  }
}
