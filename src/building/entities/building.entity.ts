import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Pig } from 'src/pig/pig.model';
import { IBuilding } from '../building.interface';

@Table
export class Building extends Model<Building, IBuilding> {
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

  @HasMany(() => Pig)
  pigs: Pig[];
}
