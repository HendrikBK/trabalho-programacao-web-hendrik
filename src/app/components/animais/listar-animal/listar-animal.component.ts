import { Component } from '@angular/core';
import { Animal } from '../../../models/animal.model';
import { AnimalService } from '../../../services/animais.service';

@Component({
  selector: 'app-listar-animal',
  imports: [],
  templateUrl: './listar-animal.component.html',
  styleUrl: './listar-animal.component.css'
})
export class ListarAnimalComponent {
  animais: Animal[] = [];
  constructor(private animalservice: AnimalService) { }
  ngOnInit() {
    this.getAllAnimais();
  }
  getAllAnimais() {
    this.animalservice.getAllAnimais().then((animais: Animal[]) => {
      this.animais = animais;
    });
  }
}
