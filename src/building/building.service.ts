import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';
import { Building } from './entities/building.entity';

@Injectable()
export class BuildingService {
  constructor(
    private sequrlize: Sequelize,
    @InjectModel(Building) private BuildingRepository: typeof Building,
  ) {}

  async create(createBuildingDto: CreateBuildingDto) {
    if (!createBuildingDto.name) {
      throw new HttpException(
        'Bad request: invalid data',
        HttpStatus.BAD_REQUEST,
      );
    }
    const building = await this.BuildingRepository.create(createBuildingDto);
    return building;
  }

  async findAll() {
    const buildings = await this.BuildingRepository.findAll({
      include: { all: true },
    });
    return buildings;
  }

  async findOne(id: number) {
    const building = await this.BuildingRepository.findByPk(id);

    if (!building) {
      throw new HttpException('Not found building', HttpStatus.NOT_FOUND);
    }

    return building;
  }

  async update(id: number, updateBuildingDto: UpdateBuildingDto) {
    const updatedBuilding = await this.BuildingRepository.findByPk(id);

    if (!updatedBuilding) {
      throw new HttpException('Not found building', HttpStatus.NOT_FOUND);
    }

    updatedBuilding.name = updateBuildingDto.name || updatedBuilding.name;

    return updatedBuilding.save();
  }

  async remove(id: number) {
    const deletedBuilding = await this.BuildingRepository.findByPk(id);
    if (!deletedBuilding) {
      throw new HttpException('Not found building', HttpStatus.NOT_FOUND);
    }
    await deletedBuilding.destroy();
    return deletedBuilding;
  }
}
