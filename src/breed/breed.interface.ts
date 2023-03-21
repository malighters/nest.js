import { Pig } from '../pig/pig.model';

export interface IBreed {
  name: string;
  direction: string;
  pigs: Pig[];
}
