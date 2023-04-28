import {
  Column,
  DataType,
  Model,
  Table,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';

import { Pig } from 'src/pig/pig.model';
import { Medicine } from 'src/medicine/entities/medicine.entity';

import { IInjection } from '../injection.interface';

@Table
export class Injection extends Model<Injection, IInjection> {
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
  injectionDate: Date;

  @Column({
    type: DataType.STRING,
  })
  note: string;

  @ForeignKey(() => Pig)
  @Column({
    type: DataType.INTEGER,
  })
  pigId: number;

  @BelongsTo(() => Pig)
  pig: Pig;

  @ForeignKey(() => Medicine)
  @Column({
    type: DataType.INTEGER,
  })
  medicineId: number;

  @BelongsTo(() => Medicine)
  medicine: Medicine;
}
