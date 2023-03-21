import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class BreedService {
  constructor(private sequelize: Sequelize) {}
}
