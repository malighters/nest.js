import { Injection } from 'src/injection/entities/injection.entity';

export interface IMedicine {
  name: string;
  description: string;
  injections: Injection[];
}
