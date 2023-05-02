import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  // Delete,
  // UseGuards,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  HttpStatus,
  HttpCode,
  SerializeOptions,
} from '@nestjs/common';
import { AssociationsService } from './associations.service';
import { CreateAssociationDto } from './dto/create-association.dto';
import { CreateJoinReqDto } from 'src/join-request/dto/create-join-request.dto';
// import { UpdateAssociationDto } from './dto/update-association.dto';
import { ApiTags } from '@nestjs/swagger';
// import { AuthGuard } from '@nestjs/passport';
// import { RolesGuard } from 'src/roles/roles.guard';
import { infinityPagination } from 'src/utils/infinity-pagination';
import { Association } from './entities/association.entity';
import { InfinityPaginationResultType } from '../utils/types/infinity-pagination-result.type';
import { NullableType } from '../utils/types/nullable.type';
import { JoinRequest } from 'src/join-request/entities/join-request.entity';

@ApiTags('associations')
@Controller({
  path: 'associations',
  version: '1',
})
export class AssociationsController {
  constructor(private readonly associationsService: AssociationsService) {}

  @SerializeOptions({
    groups: ['admin'],
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() createAssociationDto: CreateAssociationDto,
  ): Promise<Association> {
    return this.associationsService.create(createAssociationDto);
  }

  @SerializeOptions({
    groups: ['admin'],
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<InfinityPaginationResultType<Association>> {
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.associationsService.findManyWithPagination({
        page,
        limit,
      }),
      { page, limit },
    );
  }

  @SerializeOptions({
    groups: ['admin'],
  })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string): Promise<NullableType<Association>> {
    return this.associationsService.findOne({ id: +id });
  }

  @SerializeOptions({
    groups: ['admin'],
  })
  @Post(':id/join-req')
  @HttpCode(HttpStatus.CREATED)
  requestJoin(
    @Param('id') id: string,
    @Body() joinReqDto: CreateJoinReqDto,
  ): Promise<JoinRequest> {
    return this.associationsService.requestJoin(joinReqDto);
  }
}
