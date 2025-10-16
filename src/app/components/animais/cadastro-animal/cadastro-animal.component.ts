import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AnimalService } from '../../../services/animais.service';
import { Animal } from '../../../models/animal.model';
@Component({
  selector: 'app-cadastro-animal',
  imports: [ReactiveFormsModule],
  templateUrl: './cadastro-animal.component.html',
  styleUrl: './cadastro-animal.component.css'
})
export class CadastroAnimalComponent {
  animais: Animal[] = [];
  formAnimal = new FormGroup({
    nome: new FormControl(''),
    idade: new FormControl(''),
    especie: new FormControl(''),
    clienteId: new FormControl('')
  });

  constructor(private animalService: AnimalService) { }

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