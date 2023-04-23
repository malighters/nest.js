import { PartialType } from '@nestjs/mapped-types';
import { CreateInjectionDto } from './create-injection.dto';

export class UpdateInjectionDto extends PartialType(CreateInjectionDto) {}
