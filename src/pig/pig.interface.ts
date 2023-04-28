import { Building } from 'src/building/entities/building.entity';
import { Injection } from 'src/injection/entities/injection.entity';
import { Breed } from '../breed/breed.model';

export interface IPig {
  birthdate: Date;
  gender: boolean;
  note: string;
  breed: Breed;
  building: Building;
  injections: Injection[];
}
