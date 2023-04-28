import { Module } from '@nestjs/common';
import { MedicineService } from './medicine.service';
import { MedicineController } from './medicine.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Medicine } from './entities/medicine.entity';
import { Injection } from 'src/injection/entities/injection.entity';

@Module({
  controllers: [MedicineController],
  providers: [MedicineService],
  imports: [SequelizeModule.forFeature([Medicine, Injection])],
})
export class MedicineModule {}
