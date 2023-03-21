import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class PigService {
  constructor(private sequelize: Sequelize) {}
}
