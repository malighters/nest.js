import { InjectModel } from '@nestjs/sequelize';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { createPigDto } from './dto/create-pig.dto';
import { Pig } from './pig.model';
import { Breed } from '../breed/breed.model';
import { updatePigDto } from './dto/update-pig.dto';

@Injectable()
export class PigService {
  constructor(
    @InjectModel(Pig) private pigRepository: typeof Pig,
    @InjectModel(Breed) private breedRepository: typeof Breed,
  ) {}

  async createPig(dto: createPigDto) {
    if (!dto.birthdate || !dto.breedId || !dto.gender) {
      throw new HttpException(
        'Bad request: invalid data',
        HttpStatus.BAD_REQUEST,
      );
    }

    const pig = await this.pigRepository.create(dto);
    const breed = await this.breedRepository.findByPk(pig.breedId);
    if (!breed) {
      throw new HttpException('Not found breed', HttpStatus.NOT_FOUND);
    }
    return pig;
  }

  async getAllPigs() {
    const pigs = await this.pigRepository.findAll({ include: { all: true } });
    return pigs;
  }

  async getPigById(id: number) {
    const pig = await this.pigRepository.findByPk(id, {
      include: { all: true },
    });
    if (!pig) {
      throw new HttpException('Not found pig', HttpStatus.NOT_FOUND);
    }
    return pig;
  }

  async updatePig(id: number, dto: updatePigDto) {
    const updatedPig = await this.pigRepository.findByPk(id);
    if (!updatedPig) {
      throw new HttpException('Not found pig', HttpStatus.NOT_FOUND);
    }
    updatedPig.gender = dto.gender || updatedPig.gender;
    updatedPig.birthdate = dto.birthdate || updatedPig.birthdate;
    updatedPig.note = dto.note || updatedPig.note;
    return updatedPig.save();
  }

  async deletePig(id: number) {
    const deletedPig = await this.pigRepository.findByPk(id);
    if (!deletedPig) {
      throw new HttpException('Not found pig', HttpStatus.NOT_FOUND);
    }
    await deletedPig.destroy();
    return deletedPig;
  }
}
