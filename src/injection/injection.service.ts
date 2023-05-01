import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Breed } from 'src/breed/breed.model';
import { Medicine } from 'src/medicine/entities/medicine.entity';
import { Pig } from 'src/pig/pig.model';
import { CreateInjectionDto } from './dto/create-injection.dto';
import { UpdateInjectionDto } from './dto/update-injection.dto';
import { Injection } from './entities/injection.entity';

@Injectable()
export class InjectionService {
  constructor(
    private sequelize: Sequelize,
    @InjectModel(Injection) private InjectionRepository: typeof Injection,
    @InjectModel(Pig) private PigRepository: typeof Pig,
    @InjectModel(Medicine) private MedicineRepository: typeof Medicine,
    @InjectModel(Breed) private BreedRepository: typeof Breed,
  ) {}

  async create(createInjectionDto: CreateInjectionDto) {
    const pig = await this.PigRepository.findByPk(createInjectionDto.pigId);
    if (!pig) {
      throw new HttpException('Not found pig', HttpStatus.NOT_FOUND);
    }

    const currentDate = new Date();
    const injectionDate = new Date(createInjectionDto.injectionDate);
    const pigBirthDate = pig.birthdate;
    if (
      !createInjectionDto.injectionDate ||
      !createInjectionDto.pigId ||
      !createInjectionDto.medicineId ||
      currentDate < injectionDate ||
      pigBirthDate > injectionDate
    ) {
      throw new HttpException(
        'Bad request: invalid data',
        HttpStatus.BAD_REQUEST,
      );
    }

    const medicine = await this.MedicineRepository.findByPk(
      createInjectionDto.medicineId,
    );
    if (!medicine) {
      throw new HttpException('Not found medicine', HttpStatus.NOT_FOUND);
    }

    const injection = await this.InjectionRepository.create(createInjectionDto);

    return injection;
  }

  async findAll() {
    const injections = await this.InjectionRepository.findAll({
      include: { all: true },
    });
    return injections;
  }

  async findOne(id: number) {
    const injection = await this.InjectionRepository.findByPk(id, {
      include: { all: true },
    });
    if (!injection) {
      throw new HttpException('Not found injection', HttpStatus.NOT_FOUND);
    }
    return injection;
  }

  async update(id: number, updateInjectionDto: UpdateInjectionDto) {
    const updatedInjection = await this.findOne(id);
    const pigBirthDate = (
      await this.PigRepository.findByPk(updateInjectionDto.pigId)
    ).birthdate;
    if (updateInjectionDto.injectionDate) {
      const currentDate = new Date();
      const injectionDate = new Date(updateInjectionDto.injectionDate);
      if (currentDate < injectionDate || injectionDate < pigBirthDate) {
        throw new HttpException(
          'Bad request: invalid injection date',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    updatedInjection.injectionDate =
      updateInjectionDto.injectionDate || updatedInjection.injectionDate;
    updatedInjection.note = updateInjectionDto.note || updatedInjection.note;

    return updatedInjection.save();
  }

  async remove(id: number) {
    const deletedInjection = await this.findOne(id);
    await deletedInjection.destroy();
    return deletedInjection;
  }
}
