import { InjectModel } from '@nestjs/sequelize';
import { Injectable } from '@nestjs/common';
import { createPigDto } from './dto/create-pig.dto';
import { Pig } from './pig.model';

@Injectable()
export class PigService {
  constructor(@InjectModel(Pig) private pigRepository: typeof Pig) {}

  async create(dto: createPigDto) {
    const pig = await this.pigRepository.create(dto);
    return pig;
  }
}
