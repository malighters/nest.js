import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { BreedModule } from './breed/breed.module';
import { PigModule } from './pig/pig.module';
import { Breed } from './breed/breed.model';
import { Pig } from './pig/pig.model';
import { InjectionModule } from './injection/injection.module';
import { BuildingModule } from './building/building.module';
import { MedicineModule } from './medicine/medicine.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'malighters',
      database: 'pig_app',
      autoLoadModels: true,
      models: [Breed, Pig],
      dialectOptions: {
        ssl: false,
      },
    }),
    BreedModule,
    PigModule,
    InjectionModule,
    BuildingModule,
    MedicineModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
