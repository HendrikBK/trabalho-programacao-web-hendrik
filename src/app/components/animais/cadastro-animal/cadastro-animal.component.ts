import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AnimalService } from '../../../services/animais.service';
import { Animal } from '../../../models/animal.model';
import { Cliente } from '../../../models/cliente.model';
import { ClienteService } from '../../../services/clientes.service';
@Component({
  selector: 'app-cadastro-animal',
  imports: [ReactiveFormsModule],
  templateUrl: './cadastro-animal.component.html',
  styleUrl: './cadastro-animal.component.css'
})
export class CadastroAnimalComponent implements OnInit {
  animais: Animal[] = [];
  clientes: Cliente[] = [];
  formAnimal = new FormGroup({
    nome: new FormControl(''),
    idade: new FormControl(''),
    especie: new FormControl(''),
    clienteId: new FormControl('')
  });

  constructor(private animalService: AnimalService, private clienteService: ClienteService){ }

  ngOnInit() {
    this.clienteService.getAllClientes().then((clientes)=>{
      this.clientes = clientes;
    });
  }

  addAnimal() {
    if (this.formAnimal.valid) {
      const novoAnimal: Animal = {
        nome: this.formAnimal.value.nome!,
        idade: Number(this.formAnimal.value.idade!),
        especie: this.formAnimal.value.especie!,
        clienteId: Number(this.formAnimal.value.clienteId!)
      };
      this.animalService.addAnimal(novoAnimal).then(() => {
        this.formAnimal.reset();
      });
    }
  }
}