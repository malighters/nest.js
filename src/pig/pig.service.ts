import { InjectModel } from '@nestjs/sequelize';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { createPigDto } from './dto/create-pig.dto';
import { Pig } from './pig.model';
import { Breed } from '../breed/breed.model';
import { updatePigDto } from './dto/update-pig.dto';
import { Building } from 'src/building/entities/building.entity';

@Injectable()
export class PigService {
  constructor(
    @InjectModel(Pig) private PigRepository: typeof Pig,
    @InjectModel(Breed) private BreedRepository: typeof Breed,
    @InjectModel(Building) private BuildingRepository: typeof Building,
  ) {}

  async createPig(dto: createPigDto) {
    console.log(dto);

    const currentDate = new Date();
    const birthdate = new Date(dto.birthdate);
    if (
      !dto.birthdate ||
      !dto.breedId ||
      dto.gender === null ||
      birthdate > currentDate
    ) {
      throw new HttpException(
        'Bad request: invalid data',
        HttpStatus.BAD_REQUEST,
      );
    }
    const breed = await this.BreedRepository.findByPk(dto.breedId);
    if (!breed) {
      throw new HttpException('Not found breed', HttpStatus.NOT_FOUND);
    }
    const building = await this.BuildingRepository.findByPk(dto.buildingId);

    if (!building) {
      throw new HttpException('Not found building', HttpStatus.NOT_FOUND);
    }
    const pig = await this.PigRepository.create(dto);

    return pig;
  }

  async getAllPigs() {
    const pigs = await this.PigRepository.findAll({ include: { all: true } });
    return pigs;
  }

  async getPigById(id: number) {
    const pig = await this.PigRepository.findByPk(id, {
      include: { all: true },
    });
    if (!pig) {
      throw new HttpException('Not found pig', HttpStatus.NOT_FOUND);
    }
    return pig;
  }

  async updatePig(id: number, dto: updatePigDto) {
    const updatedPig = await this.getPigById(id);
    if (dto.birthdate) {
      const currentDate = new Date();
      const birthdate = new Date(dto.birthdate);
      if (currentDate < birthdate) {
        throw new HttpException(
          'Bad request: invalid birthdate',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    updatedPig.gender = dto.gender || updatedPig.gender;
    updatedPig.birthdate = dto.birthdate || updatedPig.birthdate;
    updatedPig.note = dto.note || updatedPig.note;
    return updatedPig.save();
  }

  async deletePig(id: number) {
    const deletedPig = await this.getPigById(id);
    await deletedPig.destroy();
    return deletedPig;
  }
}
