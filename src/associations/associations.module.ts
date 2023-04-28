import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Association } from './entities/association.entity';
import { AssociationsController } from './associations.controller';
import { AssociationsService } from './associations.service';

@Module({
  imports: [TypeOrmModule.forFeature([Association])],
  controllers: [AssociationsController],
  providers: [AssociationsService],
  exports: [AssociationsService],
})
export class AssociationsModule {}
