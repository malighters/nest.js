import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';

import { Injection } from '../../injection/entities/injection.entity';
import { IMedicine } from '../medicine.interface';

@Table
export class Medicine extends Model<Medicine, IMedicine> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  name: string;

  @Column({
    type: DataType.STRING,
  })
  description: string;

  @HasMany(() => Injection)
  injections: Injection[];
}
