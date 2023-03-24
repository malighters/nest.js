import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Pig } from '../pig/pig.model';
import { BreedController } from './breed.controller';
import { Breed } from './breed.model';
import { BreedService } from './breed.service';

@Module({
  controllers: [BreedController],
  providers: [BreedService],
  imports: [SequelizeModule.forFeature([Breed, Pig])],
})
export class BreedModule {}
