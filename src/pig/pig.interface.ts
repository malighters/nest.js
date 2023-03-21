import { Breed } from '../breed/breed.model';

export interface IPig {
  birthdate: Date;
  gender: boolean;
  note: string;
  breed: Breed;
}
