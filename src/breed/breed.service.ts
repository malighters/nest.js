import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    if (!dto.name || !dto.direction) {
      throw new HttpException(
        'Bad request: invalid data',
        HttpStatus.BAD_REQUEST,
      );
    }
    const breed = this.BreedRepository.create(dto);
    return breed;
  }

  async getAllBreeds() {
    const breeds = this.BreedRepository.findAll({ include: { all: true } });
    return breeds;
  }

  async getBreedById(id: number) {
    const breed = this.BreedRepository.findByPk(id);
    if (!breed) {
      throw new HttpException('Not found breed', HttpStatus.NOT_FOUND);
    }
    return breed;
  }

  async updateBreed(id: number, dto: updateBreedDto) {
    const updatedBreed = await this.getBreedById(id);
    updatedBreed.name = dto.name || updatedBreed.name;
    updatedBreed.direction = dto.direction || updatedBreed.direction;
    return updatedBreed.save();
  }

  async deleteBreed(id: number) {
    const deletedBreed = await this.getBreedById(id);
    await deletedBreed.destroy();
    return deletedBreed;
  }
}
