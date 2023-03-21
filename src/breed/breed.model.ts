import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Pig } from '../pig/pig.model';
import { IBreed } from './breed.interface';

@Table
export class Breed extends Model<Breed, IBreed> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  direction: string;

  @HasMany(() => Pig)
  pigs: Pig[];
}
