import { Controller, Post } from '@nestjs/common';
import { createPigDto } from './dto/create-pig.dto';
import { PigService } from './pig.service';

@Controller('pigs')
export class PigController {
  constructor(private pigService: PigService) {}

  @Post()
  async createPig(dto: createPigDto) {
    return await this.pigService.create(dto);
  }
}
