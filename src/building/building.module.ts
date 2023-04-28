import { Module } from '@nestjs/common';
import { BuildingService } from './building.service';
import { BuildingController } from './building.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Building } from './entities/building.entity';
import { Pig } from 'src/pig/pig.model';

@Module({
  controllers: [BuildingController],
  providers: [BuildingService],
  imports: [SequelizeModule.forFeature([Building, Pig])],
})
export class BuildingModule {}
