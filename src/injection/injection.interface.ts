import { Pig } from 'src/pig/pig.model';

import { Medicine } from 'src/medicine/entities/medicine.entity';

export interface IInjection {
  injectiondate: Date;
  note: string;
  pig: Pig;
  medicine: Medicine;
}
