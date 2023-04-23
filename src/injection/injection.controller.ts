import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InjectionService } from './injection.service';
import { CreateInjectionDto } from './dto/create-injection.dto';
import { UpdateInjectionDto } from './dto/update-injection.dto';

@Controller('injection')
export class InjectionController {
  constructor(private readonly injectionService: InjectionService) {}

  @Post()
  create(@Body() createInjectionDto: CreateInjectionDto) {
    return this.injectionService.create(createInjectionDto);
  }

  @Get()
  findAll() {
    return this.injectionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.injectionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInjectionDto: UpdateInjectionDto) {
    return this.injectionService.update(+id, updateInjectionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.injectionService.remove(+id);
  }
}
