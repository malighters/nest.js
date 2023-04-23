import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';

import { Injection } from 'src/injection/entities/injection.entity';

@Table
export class Medicine extends Model {
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
  })
  name: string;

  @Column({
    type: DataType.STRING,
  })
  description: string;

  @HasMany(() => Injection)
  injections: Injection[];
}
