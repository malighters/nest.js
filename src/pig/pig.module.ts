import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PigController } from './pig.controller';
import { Pig } from './pig.model';
import { PigService } from './pig.service';

@Module({
  controllers: [PigController],
  providers: [PigService],
  imports: [SequelizeModule.forFeature([Pig])],
})
export class PigModule {}
