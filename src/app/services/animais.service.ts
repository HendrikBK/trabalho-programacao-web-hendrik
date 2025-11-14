import { Injectable } from '@angular/core';
import { Animal } from '../models/animal.model';
import { db, DbService } from './db.service';

@Injectable(
  { providedIn: 'root' }
)

export class AnimalService {
  constructor(private dbService: DbService) { }
  async addAnimal(animal: Animal) {
    return this.dbService.animais.add(animal);
  }
  async getAllAnimais(): Promise<Animal[]> {
    return this.dbService.animais.toArray();
  }

  async getAnimalById(id: number) {
    return db.animais.get(id);
  }

  async deleteAnimal(id: number) {
    return this.dbService.animais.delete(id);
  }

  async updateAnimal(animal: Animal) {
    return this.dbService.animais.put(animal);
    }
}