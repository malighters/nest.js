import { Module } from '@nestjs/common';
import { InjectionService } from './injection.service';
import { InjectionController } from './injection.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Injection } from './entities/injection.entity';
import { Pig } from 'src/pig/pig.model';
import { Medicine } from 'src/medicine/entities/medicine.entity';
import { MedicineService } from 'src/medicine/medicine.service';
import { PigService } from 'src/pig/pig.service';
import { BreedService } from 'src/breed/breed.service';
import { Breed } from 'src/breed/breed.model';
import { Building } from 'src/building/entities/building.entity';
import { BuildingService } from 'src/building/building.service';

@Module({
  controllers: [InjectionController],
  providers: [
    InjectionService,
    PigService,
    MedicineService,
    BreedService,
    BuildingService,
  ],
  imports: [
    SequelizeModule.forFeature([Injection, Pig, Medicine, Breed, Building]),
  ],
})
export class InjectionModule {}
