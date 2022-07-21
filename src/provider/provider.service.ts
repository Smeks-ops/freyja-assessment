import { Injectable, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as AWS from 'aws-sdk';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { Provider } from './entities/provider.entity';
import { S3Service } from 'src/common/services/s3/s3.service';
import { ProviderPayload } from './types/provider.types';

@Injectable()
export class ProviderService {
  constructor(
    @InjectRepository(Provider)
    private providerRepository: Repository<Provider>,
    private s3Service: S3Service,
  ) {}

  async create(CreateProviderDto: any): Promise<Provider> {
    const { buffer, originalname, name } = CreateProviderDto;

    const imageUrl = await Promise.all([
      await this.s3Service.uploadFile(buffer, originalname),
    ]);

    const payload: ProviderPayload = {
      name,
      logo: `${imageUrl}`,
    };

    return this.providerRepository.save(payload);
  }

  findAll() {
    return `This action returns all provider`;
  }

  findOne(id: number) {
    return `This action returns a #${id} provider`;
  }

  update(id: number, updateProviderDto: UpdateProviderDto) {
    return `This action updates a #${id} provider`;
  }

  remove(id: number) {
    return `This action removes a #${id} provider`;
  }
}
