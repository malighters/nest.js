import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BreedService } from 'src/breed/breed.service';
import { BuildingService } from 'src/building/building.service';
import { Building } from 'src/building/entities/building.entity';
import { Breed } from '../breed/breed.model';
import { PigController } from './pig.controller';
import { Pig } from './pig.model';
import { PigService } from './pig.service';

@Module({
  controllers: [PigController],
  providers: [PigService, BreedService, BuildingService],
  imports: [SequelizeModule.forFeature([Pig, Breed, Building])],
})
export class PigModule {}
