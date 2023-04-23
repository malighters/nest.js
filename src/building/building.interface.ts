import { Pig } from '../pig/pig.model';

export interface IBuilding {
  name: string;
  quantity: number;
  pigs: Pig[];
}
