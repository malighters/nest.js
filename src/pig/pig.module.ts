import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BreedService } from 'src/breed/breed.service';
import { Breed } from '../breed/breed.model';
import { PigController } from './pig.controller';
import { Pig } from './pig.model';
import { PigService } from './pig.service';

@Module({
  controllers: [PigController],
  providers: [PigService, BreedService],
  imports: [SequelizeModule.forFeature([Pig, Breed])],
})
export class PigModule {}
