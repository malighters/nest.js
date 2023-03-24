import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Breed } from '../breed/breed.model';
import { IPig } from './pig.interface';

@Table
export class Pig extends Model<Pig, IPig> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  birthdate: Date;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  gender: boolean;

  @Column({
    type: DataType.STRING,
  })
  note: string;

  @ForeignKey(() => Breed)
  @Column({
    type: DataType.INTEGER,
  })
  breedId: number;

  @BelongsTo(() => Breed)
  breed: Breed;
}
