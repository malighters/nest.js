import {
  Controller,
  Get,
  Post,
  Param,
  Patch,
  Delete,
  Body,
} from '@nestjs/common';
import { createPigDto } from './dto/create-pig.dto';
import { updatePigDto } from './dto/update-pig.dto';
import { PigService } from './pig.service';

@Controller('api/pigs')
export class PigController {
  constructor(private pigService: PigService) {}

  @Get()
  async getAllPigs() {
    return await this.pigService.getAllPigs();
  }

  @Get(':id')
  async getPigById(@Param('id') id) {
    return await this.pigService.getPigById(+id);
  }

  @Post()
  async createPig(@Body() dto: createPigDto) {
    return await this.pigService.createPig(dto);
  }

  @Patch(':id')
  async updatePig(@Param('id') id, @Body() dto: updatePigDto) {
    return await this.pigService.updatePig(+id, dto);
  }

  @Delete(':id')
  async deletePig(@Param('id') id) {
    return await this.pigService.deletePig(+id);
  }
}
