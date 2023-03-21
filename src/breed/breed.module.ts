import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BreedController } from './breed.controller';
import { Breed } from './breed.model';
import { BreedService } from './breed.service';

@Module({
  controllers: [BreedController],
  providers: [BreedService],
  imports: [SequelizeModule.forFeature([Breed])],
})
export class BreedModule {}
