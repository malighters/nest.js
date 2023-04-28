import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { BreedService } from './breed.service';
import { createBreedDto } from './dto/create-breed.dto';
import { updateBreedDto } from './dto/update-breed.dto';

@Controller('api/breeds')
export class BreedController {
  constructor(private breedService: BreedService) {}

  @Get()
  getAllBreads() {
    return this.breedService.getAllBreeds();
  }

  @Get(':id')
  getBreedById(@Param('id') id) {
    return this.breedService.getBreedById(+id);
  }

  @Post()
  create(@Body() breedDto: createBreedDto) {
    return this.breedService.createBreed(breedDto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() breedDto: updateBreedDto) {
    return this.breedService.updateBreed(+id, breedDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.breedService.deleteBreed(+id);
  }
}
