import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AnimalService } from '../../../services/animais.service';
import { Animal } from '../../../models/animal.model';
import { Cliente } from '../../../models/cliente.model';
import { ClienteService } from '../../../services/clientes.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastro-animal',
  imports: [ReactiveFormsModule],
  templateUrl: './cadastro-animal.component.html',
  styleUrl: './cadastro-animal.component.css'
})
export class CadastroAnimalComponent implements OnInit {
  animais: Animal[] = [];
  clientes: Cliente[] = [];
  private fb = inject(FormBuilder);
  formAnimal = this.fb.group({
    nome: ['', Validators.required],
    idade: [null as number | null, Validators.required],
    especie: ['', Validators.required],
    clienteId: [null as number | null, Validators.required]
  });

  animalId!: number

  constructor(private animalService: AnimalService, private clienteService: ClienteService, private route: ActivatedRoute, private router: Router) { }

  async ngOnInit() {
    this.animalId = Number(this.route.snapshot.paramMap.get('id'));

    this.animalId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.animalId) {
      const animal = await
        this.animalService.getAnimalById(this.animalId);
      if (animal) {
        this.formAnimal.patchValue({
          nome: animal.nome,
          idade: Number(animal.idade),
          especie: animal.especie,
          clienteId: animal.clienteId
        });
      };
    }


    this.clienteService.getAllClientes().then((clientes) => {
      this.clientes = clientes;
    });
  }

  editAnimal() {
      if (this.formAnimal.valid) {
        const animalEditado: Animal = {
          nome: this.formAnimal.value.nome!,
          idade: this.formAnimal.value.idade!,
          especie: this.formAnimal.value.especie!,
          clienteId: this.formAnimal.value.clienteId!
        };
        this.animalService.updateAnimal(animalEditado).then(() => {
          Swal.fire('Cadastro realizado!', 'O produto foi atualizado com sucesso.',
            'success');
          this.router.navigate(['produtos/listar-produtos']);
        });
      }
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
    } else {
      this.editAnimal();
    }
  }
}