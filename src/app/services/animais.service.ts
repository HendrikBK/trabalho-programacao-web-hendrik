import { Injectable } from '@angular/core';
import { Animal } from '../models/animal.model';
import { db, DbService } from './db.service';

@Injectable(
  { providedIn: 'root' }
)

export class AnimalService {
  constructor(private dbService: DbService) { }
  addAnimal(animal: Animal) {
    return this.dbService.animais.add(animal);
  }
  getAllAnimais(): Promise<Animal[]> {
    return this.dbService.animais.toArray();
  }

  getAnimalById(id: number) {
    return db.animais.get(id);
  }

  deleteAnimal(id: number) {
    return this.dbService.animais.delete(id);
  }
}