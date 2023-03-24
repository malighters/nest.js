import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Breed } from './breed.model';
import { createBreedDto } from './dto/create-breed.dto';
import { updateBreedDto } from './dto/update-breed.dto';

@Injectable()
export class BreedService {
  constructor(
    private sequelize: Sequelize,
    @InjectModel(Breed) private BreedRepository: typeof Breed,
  ) {}

  async createBreed(dto: createBreedDto) {
    const breed = this.BreedRepository.create(dto);
    return breed;
  }

  async getAllBreeds() {
    const breeds = this.BreedRepository.findAll();
    return breeds;
  }

  async getBreedById(id: number) {
    const breed = this.BreedRepository.findByPk(id);
    if (!breed) {
      return 'No such breed';
    }
    return breed;
  }

  async updateBreed(dto: updateBreedDto, id: number) {
    const updatedBreed: Breed = await this.BreedRepository.findByPk(id);
    updatedBreed.name = dto.name || updatedBreed.name;
    updatedBreed.direction = dto.direction || updatedBreed.direction;
    return updatedBreed.save();
  }

  async deleteBreed(id: number) {
    const deletedBreed = await this.BreedRepository.findByPk(id);
    await deletedBreed.destroy();
    return deletedBreed;
  }
}
