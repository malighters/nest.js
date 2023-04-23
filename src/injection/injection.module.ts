import { Module } from '@nestjs/common';
import { InjectionService } from './injection.service';
import { InjectionController } from './injection.controller';

@Module({
  controllers: [InjectionController],
  providers: [InjectionService]
})
export class InjectionModule {}
