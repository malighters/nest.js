import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
import { Medicine } from './entities/medicine.entity';

@Injectable()
export class MedicineService {
  constructor(
    private sequelize: Sequelize,
    @InjectModel(Medicine) private MedicineRepository: typeof Medicine,
  ) {}

  async create(createMedicineDto: CreateMedicineDto) {
    if (!createMedicineDto.name || !createMedicineDto.description) {
      throw new HttpException(
        'Bad request: invalid data',
        HttpStatus.BAD_REQUEST,
      );
    }
    const medicine = await this.MedicineRepository.create(createMedicineDto);
    return medicine;
  }

  async findAll() {
    const medicines = await this.MedicineRepository.findAll({
      include: { all: true },
    });
    return medicines;
  }

  async findOne(id: number) {
    const medicine = await this.MedicineRepository.findByPk(id);

    if (!medicine) {
      throw new HttpException('Not found medicine', HttpStatus.NOT_FOUND);
    }

    return medicine;
  }

  async update(id: number, updateMedicineDto: UpdateMedicineDto) {
    const updateBreed = await this.findOne(id);
    updateBreed.name = updateMedicineDto.name || updateBreed.name;
    updateBreed.description =
      updateMedicineDto.description || updateBreed.description;
  }

  async remove(id: number) {
    const deletedMedicine = await this.findOne(id);
    await deletedMedicine.destroy();
    return deletedMedicine;
  }
}
