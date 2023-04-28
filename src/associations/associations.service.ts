import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { Repository } from 'typeorm';
import { CreateAssociationDto } from './dto/create-association.dto';
import { Association } from './entities/association.entity';
import { NullableType } from '../utils/types/nullable.type';

@Injectable()
export class AssociationsService {
  constructor(
    @InjectRepository(Association)
    private associationsRepository: Repository<Association>,
  ) {}

  create(createAssocDto: CreateAssociationDto): Promise<Association> {
    return this.associationsRepository.save(
      this.associationsRepository.create(createAssocDto),
    );
  }

  findManyWithPagination(
    paginationOptions: IPaginationOptions,
  ): Promise<Association[]> {
    console.log(paginationOptions);
    return this.associationsRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });
  }

  findOne(
    fields: EntityCondition<Association>,
  ): Promise<NullableType<Association>> {
    return this.associationsRepository.findOne({
      where: fields,
    });
  }
}
