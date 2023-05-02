import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { Repository } from 'typeorm';
import { CreateAssociationDto } from './dto/create-association.dto';
import { CreateJoinReqDto } from 'src/join-request/dto/create-join-request.dto';
import { Association } from './entities/association.entity';
import { NullableType } from '../utils/types/nullable.type';
import { JoinRequest } from 'src/join-request/entities/join-request.entity';

@Injectable()
export class AssociationsService {
  constructor(
    @InjectRepository(Association)
    private assocRepository: Repository<Association>,
    @InjectRepository(JoinRequest)
    private joinReqRepository: Repository<JoinRequest>,
  ) {}

  create(createAssocDto: CreateAssociationDto): Promise<Association> {
    return this.assocRepository.save(
      this.assocRepository.create(createAssocDto),
    );
  }

  findManyWithPagination(
    paginationOptions: IPaginationOptions,
  ): Promise<Association[]> {
    return this.assocRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });
  }

  findOne(
    fields: EntityCondition<Association>,
  ): Promise<NullableType<Association>> {
    return this.assocRepository.findOne({
      where: fields,
    });
  }

  requestJoin(createJoinReqDto: CreateJoinReqDto): Promise<JoinRequest> {
    return this.joinReqRepository.save(
      this.joinReqRepository.create(createJoinReqDto),
    );
  }
}
